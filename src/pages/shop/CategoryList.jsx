import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Ensure correct import for useParams
import { fetchProductsByCategoryId } from '../../api/spring/fetchProductsByCategoryId'; // Correct import
import ProductList from '../../components/ProductList';
import { Loader, Grid, Header, Segment } from 'semantic-ui-react';
import "./CategoryList.css"; // Include custom styles

const CategoryList = () => {
  const [products, setProducts] = useState([]); // Initialized to empty array
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [hasError, setHasError] = useState(false); // Error state
  const { categoryId } = useParams(); // Get the category ID from URL params

  useEffect(() => {
    const loadProductsByCategoryId = async () => {
      setIsLoading(true); // Reset loading state when category changes
      try {
        const categoryID = parseInt(categoryId, 10); // Parse categoryId as a number
        const productsData = await fetchProductsByCategoryId(categoryID); // Fetch products by category
        setProducts(productsData); // Store fetched products
        setHasError(false); // Reset error state
      } catch (error) {
        console.error('Error fetching products by category:', error);
        setHasError(true); // Set error state if fetching fails
      } finally {
        setIsLoading(false); // End loading state once fetch is complete
      }
    };

    loadProductsByCategoryId(); // Fetch data on component mount or when category changes
  }, [categoryId]); // Re-run when categoryId changes

  console.log(products);

  if (isLoading) { // Show loading screen while fetching new category
    return (
      <Loader active inline="centered">Loading products...</Loader> // Display loading
    );
  }

  if (hasError) { // Handle error scenario
    return (
      <Segment>
        <Header as='h3' textAlign='center'>Error fetching products. Please try again later.</Header>
      </Segment>
    );
  }

  if (products.length === 0) { // Check for zero results
    return (
      <Segment>
        <Header as='h3' textAlign='center'>No products found in this category.</Header>
      </Segment>
    );
  }

  const resultsText = products.length === 1 ? "1 result found" : `${products.length} results found`; // Determine results text

  return (
    <div className='category-list'>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column textAlign='left'>
            <h1 className='category-id'>Category {categoryId}</h1> {/* Display category ID */}
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
