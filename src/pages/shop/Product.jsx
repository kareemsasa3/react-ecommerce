import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Header, Button } from 'semantic-ui-react';
import fetchProductById from '../../api/fetchProductById';
import './shop.css';

const Product = (props) => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const loadProductById = async () => {
            try {
                const productData = await fetchProductById(id);
                setProduct(productData);
            } catch (error) {
                console.error('Error loading products in shop.jsx: ', error);
            }
        }

        loadProductById();
    }, [id]);

    if (!product) {
        return <div>Loading...</div>
    }

    const { name, price, description, image } = product;
    const descriptionWithNewlines = description.replace(/<\/p>/g, '<br> ');

    return (
        <div className="product">
            <Header as='h2' textAlign='center'>{name}</Header>
            <img src={image.url} alt={name} />
            <div className='description'>
                <h3>{name}</h3>
                <h4>{price.formatted_with_symbol}</h4>
                <p dangerouslySetInnerHTML={{ __html: descriptionWithNewlines }} />
                <Button primary as={Link} to="/">Back to Shop</Button>
            </div>
        </div>
    );
};

export default Product;
