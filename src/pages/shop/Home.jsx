import React, { useState, useEffect } from 'react';
import './Home.css';
import fetchProducts from '../../api/fetchProducts';
import ProductList from '../../components/ProductList';

const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error loading products:', error);
      }
    };

    loadProducts();
  }, []);

  return (
    <div className='shop' id="products">
      <ProductList products={products} />
    </div>
  );
};

export default Shop;
