import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchCategoryByProductId } from '../../api/spring/fetchById'; // Import the necessary functions
import { fetchProducts } from '../../api/spring/fetchProducts';
import findMostCommonCategory from '../../util/FindMostCommonCategory';
import CategoryList from './CategoryList'; // Import CategoryList component
import ProductList from './ProductList'; // Import ProductList for displaying products

const MostCommonCategory = () => {
  const cart = useSelector((state) => state.shop.cart);
  const [mostCommonCategoryId, setMostCommonCategoryId] = useState(null);
  const [defaultProducts, setDefaultProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryIds = async () => {
      try {
        const categoryIds = await Promise.all(
          cart.map(async (productId) => {
            const categoryId = await fetchCategoryByProductId(productId); // Fetch category ID for each product
            return categoryId;
          })
        );

        const commonCategoryId = findMostCommonCategory(categoryIds); // Find the most common category ID
        setMostCommonCategoryId(commonCategoryId); // Set the most common category ID
      } catch (error) {
        console.error("Error fetching category IDs:", error);
      }
    };

    const fetchDefaultProducts = async () => {
      try {
        const products = await fetchProducts(); // Fetch the 5 newest products
        setDefaultProducts(products.slice(0, 5)); // Store only the top 5 products
      } catch (error) {
        console.error("Error fetching default products:", error);
      }
    };

    if (cart.length > 0) {
      fetchCategoryIds(); // Fetch category IDs if the cart is not empty
    } else {
      fetchDefaultProducts(); // Fetch default products if the cart is empty
    }
  }, [cart]); // Re-run when the cart changes

  return (
    <div>
      {mostCommonCategoryId ? (
        <CategoryList categoryId={mostCommonCategoryId} /> // Call CategoryList with the most common category ID
      ) : (
        <ProductList products={defaultProducts} /> // Display default products when no common category
      )}
    </div>
  );
};

export default MostCommonCategory;
