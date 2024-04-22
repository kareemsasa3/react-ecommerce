import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import fetchProductsByCategoryName from '../../api/fetchProductsByCategoryName';

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

    console.log('Products in category: ', products);
    console.log('Category Name: ', categoryName);

    return (
        <div>
            <h1>Products in Category: {categoryName}</h1>
            {products && products.length > 0 ? (
                <ul>
                    {products.map(product => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                </ul>
            ) : (
                <p>No products available for this category.</p>
            )}
        </div>
    );
    
};

export default CategoryList;
