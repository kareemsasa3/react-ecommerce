import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import fetchProductsByCategoryName from '../../api/fetchProductsByCategoryName';
import ProductList from '../../components/ProductList';

const CategoryList = () => {
    const [products, setProducts] = useState([]);
    const { categoryName } = useParams();

    useEffect(() => {
        const loadProductsByCategoryName = async () => {
            try {
                const productsData = await fetchProductsByCategoryName(categoryName);
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products by category:', error);
            }
        };

        loadProductsByCategoryName();
    }, [categoryName]);

    return (
        <div>
            <h1>Products in Category: {categoryName}</h1>
            {products && products.length > 0 ? (
                <ProductList products={products} />
            ) : (
                <p>No products available for this category.</p>
            )}
        </div>
    );
};

export default CategoryList;
