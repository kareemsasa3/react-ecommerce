import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchAddressesByUserId } from '../../api/spring/fetchById';
import AddressList from '../lists/AddressList';
import './AddressBook.css';

const AddressBook = () => {
    const [addresses, setAddresses] = useState([]);
    const navigate = useNavigate();    

    const handleEditAddressBook = () => {
        navigate('/addressbook');
    };

    const handleAddNewAddress = () => {
        navigate('/addressbook/new');
    };

    const userId = useSelector((state) => state.auth.user ? state.auth.user.id : null);

    useEffect(() => {

        const fetchAddresses = async () => {
            if (userId === null) {
                return <div>No user found!</div>;
            } else {
                try {
                    const addresses = await fetchAddressesByUserId(userId);
                    setAddresses(addresses);
                } catch (error) {
                    console.error('Failed to fetch addresses: ', error);
                }
            }
        };

        fetchAddresses();
    }, [userId]);

    return (
        <div className='address-book-container'>
            <AddressList
                addresses={addresses}
                onEditAddressBook={handleEditAddressBook}
                onAddNewAddress={handleAddNewAddress}
            />
        </div>
    );
};

export default AddressBook;