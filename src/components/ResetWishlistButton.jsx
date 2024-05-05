import React from 'react';
import { useDispatch } from 'react-redux';
import { resetWishlist } from '../redux/shopSlice'; // Import the resetCart action
import { Button } from 'semantic-ui-react';

const ResetCartButton = () => {
    const dispatch = useDispatch(); // Get the Redux dispatch function

    const handleResetWishlist = () => {
        dispatch(resetWishlist()); // Dispatch the resetCart action
    };

    return (
        <Button onClick={handleResetWishlist}>Reset Wishlist</Button> // Button to reset the cart
    );
};

export default ResetCartButton;
