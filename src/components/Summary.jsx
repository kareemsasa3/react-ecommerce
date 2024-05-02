import { Segment, Header, Divider, Button } from 'semantic-ui-react';
import "./Summary.css";

const Summary = ({ itemCount, cartProducts }) => {
  const subtotal = cartProducts.reduce(
    (total, product) => total + parseFloat(product.price.raw),
    0
  );

  const shipping = 6.95;
  const estimatedTotal = subtotal + shipping;

  const getItemsLabel = (itemCount) => {
    return itemCount === 1 ? "1 ITEM" : `${itemCount} ITEMS`;
  };

  const itemsLabel = getItemsLabel(itemCount);

  return (
    <Segment className="checkout-info">
        <div className='summary-line'>
            <Header as="h1" className='bold-header'>SUMMARY</Header>
            <p className='right-align'>{itemsLabel}</p>
        </div>
        <Divider />
        <div className="conditions">
            <p>By clicking checkout, I agree to terms & conditions and understand that all sales are final.</p>
        </div>
        <Divider />
        <div className="summary-line">
            <p>SUBTOTAL</p>
            <p className="summary-value">${subtotal.toFixed(2)}</p>
        </div>
        <div className="summary-line">
            <p>SHIPPING</p>
            <p className="summary-value">${shipping.toFixed(2)}</p>
        </div>
        <div className="summary-line">
            <p>SALES TAX</p>
            <p className="summary-value">Calculated at checkout</p>
        </div>
        <div className="summary-line bold-large-text">
            <p>ESTIMATED TOTAL</p>
            <p className="summary-value">${estimatedTotal.toFixed(2)}</p>
        </div>
        <Button className='checkout-btn' onClick={() => console.log('Checkout button clicked!')}>
            SECURE CHECKOUT
        </Button>
    </Segment>
  );
};

export default Summary;
