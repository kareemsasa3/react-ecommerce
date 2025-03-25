import React from 'react';
import { useDispatch } from 'react-redux';
import { resetCart } from '../redux/shopSlice'; // Import the resetCart action
import { Button } from 'semantic-ui-react';

const ResetCartButton = () => {
    const dispatch = useDispatch(); // Get the Redux dispatch function

    const handleResetCart = () => {
        dispatch(resetCart()); // Dispatch the resetCart action
    };

    return (
        <Button onClick={handleResetCart}>Reset Cart</Button> // Button to reset the cart
    );
};

export default ResetCartButton;
