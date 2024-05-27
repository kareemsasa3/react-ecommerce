import React from 'react';
import { Segment, Header, Button, Icon } from 'semantic-ui-react';
import './CartItems.css';

const CartItems = ({ cartProducts, removeFromCart }) => (
  <>
    {cartProducts.map((product) => (
      <Segment key={product.id} className="cart-product">
        <div className="cart-product-info">
          <img src={product.imageUrl} alt={product.name} className="cart-product-image" /> {/* Product image */}
          <div className="cart-product-details">
            <Header as='h4' className='product-description'>{product.description}</Header>
            <Header as='h3' className='product-name'>{product.name}</Header>
          </div>
          <Button
            icon
            onClick={() => removeFromCart(product.id)}
            className="remove-button"
          >
            <Icon name="trash alternate" size="large" />
          </Button>
          <p>$ {product.price}</p>
        </div>
      </Segment>
    ))}
  </>
);

export default CartItems;
