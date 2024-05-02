import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import fetchProductsByCategoryName from '../../api/fetchProductsByCategoryName';
import ProductList from '../../components/ProductList';
import { Loader, Grid, Header, Segment } from 'semantic-ui-react';
import "./CategoryList.css";

const CategoryList = () => {
  const [products, setProducts] = useState([]); // Initialized to an empty array
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const [hasError, setHasError] = useState(false); // Error state
  const { categoryName } = useParams(); // Get the category name from URL params

  useEffect(() => {
    const loadProductsByCategoryName = async () => {
      setIsLoading(true); // Reset loading state when category changes
      try {
        const productsData = await fetchProductsByCategoryName(categoryName); // Fetch products by category
        setProducts(productsData); // Store fetched products
        setHasError(false); // Reset error state
      } catch (error) {
        console.error('Error fetching products by category:', error);
        setHasError(true); // Set error state if fetching fails
      } finally {
        setIsLoading(false); // End loading state once fetch is complete
      }
    };

    loadProductsByCategoryName(); // Fetch data on component mount or when category changes
  }, [categoryName]); // Dependency on category name

  let resultsText = ''; // Declare results text variable

  if (isLoading) { // Show loading screen while fetching new category
    return <Loader active inline="centered">Loading products...</Loader>; // Display loading screen
  }

  if (hasError) { // Handle error scenario
    resultsText = 'Error fetching results. Please try again later.';
    return (
      <Segment>
        <div className='results-count'>
          <Header as='h3' textAlign='center'>{resultsText}</Header>
        </div>
      </Segment>
    );
  }

  if (products.length === 0) { // Check for zero results
    resultsText = 'No results found';
    return (
      <Segment>
        <div className='results-count'>
          <Header as='h3' textAlign='center'>{resultsText}</Header>
        </div>
      </Segment>
    );
  }

  // Determine results text based on product count
  if (products.length === 1) {
    resultsText = "1 result found"; // Singular
  } else {
    resultsText = `${products.length} results found`; // Plural
  }

  return (
    <div className='category-list'>
      <Grid>
        <Grid.Row columns={2}>
          <Grid.Column textAlign='left'>
            <h1 className='category-name'>{categoryName}</h1> {/* Category name */}
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <div className='results-count'>
              <Header as='h3' className='results-count'>{resultsText}</Header> {/* Results count */}
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <div className='products'>
        <ProductList products={products} /> {/* Wrapped ProductList in a div */}
      </div>
    </div>
  );
};

export default CategoryList;
