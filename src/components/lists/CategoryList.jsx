import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // For URL params
import { 
  fetchProductsByCategoryId, 
  fetchCategoryByCategoryId,
} from '../../api/spring/fetchById';
import ProductList from './ProductList';
import { Loader, Grid, Header, Segment } from 'semantic-ui-react';
import "./CategoryList.css"; // Custom styles

const CategoryList = ({ categoryId: propCategoryId }) => {
  const { categoryId: paramCategoryId } = useParams(); // Get categoryId from URL
  const categoryId = propCategoryId || paramCategoryId; // Use prop if available, otherwise use URL param

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadCategoryDetails = async () => {
      try {
        const categoryData = await fetchCategoryByCategoryId(parseInt(categoryId, 10));
        setCategory(categoryData);
      } catch (error) {
        console.error('Error fetching category:', error);
        setHasError(true);
      }
    };

    if (categoryId) {
      loadCategoryDetails();
    }
  }, [categoryId]);

  useEffect(() => {
    const loadProductsByCategoryId = async () => {
      setIsLoading(true); // Start loading
      try {
        // Fetch products by category ID
        const productsData = await fetchProductsByCategoryId(parseInt(categoryId, 10));
        
        // If the category ID is passed as a prop, limit to 5 products
        const limitedProducts = propCategoryId ? productsData.slice(0, 5) : productsData;

        setProducts(limitedProducts); // Store products with or without limit
        setHasError(false); // Reset error state
      } catch (error) {
        console.error('Error fetching products by category:', error);
        setHasError(true); // Set error state
      } finally {
        setIsLoading(false); // End loading state
      }
    };

    if (categoryId) {
      loadProductsByCategoryId(); // Fetch products if categoryId is valid
    }
  }, [categoryId]); // Re-run when categoryId changes

  if (isLoading) {
    return <Loader active inline="centered">Loading products...</Loader>; // Show loading screen
  }

  if (hasError) {
    return (
      <Segment>
        <Header as='h3' textAlign='center'>Error fetching products. Please try again later.</Header>
      </Segment>
    );
  }

  if (products.length === 0) { // Handle no products
    return (
      <Segment>
        <Header as='h3' textAlign='center'>No products found in this category.</Header> // Display when no products
      </Segment>
    );
  }

  const resultsText = products.length === 1 ? "1 result found" : `${products.length} results found`;

  return (
    <div className='category-list'>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column textAlign='left'>
            <h1 className='category-name'>{category?.name} </h1>
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Header as='h3' className='results-count'>{resultsText}</Header> {/* Display results count */}
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <div className='products'>
        <ProductList products={products} /> {/* Display products */}
      </div>
    </div>
  );
};

export default CategoryList;
