import React from 'react';
import { Segment, Header, Button, Icon } from 'semantic-ui-react';
import './CartItems.css';

const stripHTML = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    return doc.body.textContent || ''; // Return only text content, stripping HTML tags
};

const CartItems = ({ cartProducts, removeFromCart }) => (
  <>
    {cartProducts.map((product) => (
      <Segment key={product.id} className="cart-product">
        <div className="cart-product-info">
          <img src={product.image.url} alt={product.name} className="cart-product-image" /> {/* Product image */}
          <div className="cart-product-details">
            <Header as='h4' className='product-description'>{stripHTML(product.description)}</Header>
            <Header as='h3' className='product-name'>{product.name}</Header>
          </div>
          <Button
            icon
            onClick={() => removeFromCart(product.id)}
            className="remove-button"
          >
            <Icon name="trash alternate" size="large" />
          </Button>
          <p>{product.price.formatted_with_symbol}</p>
        </div>
      </Segment>
    ))}
  </>
);

export default CartItems;
