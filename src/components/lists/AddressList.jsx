import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Icon } from 'semantic-ui-react';
import './AddressList.css';

const AddressList = ({ addresses, onEditAddressBook, onAddNewAddress }) => {
    return (
        <div className='address-book-details'>
            <Grid>
                <Grid.Row columns={2}>
                    <Grid.Column>
                        <p className='address-book-title'>ADDRESS BOOK</p>
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                        <button
                            onClick={onEditAddressBook}
                            className='transparent-button'
                        >
                            <Icon name="pencil" />
                            EDIT / VIEW ALL
                        </button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <div className='address-list'>
                {addresses.map((address) => (
                    <div key={address.id} className='address-item'>
                        <p>{address.streetAddress}, {address.city}, {address.state}, {address.zipCode}</p>
                    </div>
                ))}
            </div>
            <button
                onClick={onAddNewAddress}
                className='transparent-button'
            >
                <Icon name='plus' />
                ADD NEW ADDRESS
            </button>
        </div>
    );
};

AddressList.propTypes = {
    addresses: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        streetAddress: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        zipCode: PropTypes.string.isRequired
    })).isRequired,
    onEditAddressBook: PropTypes.func.isRequired,
    onAddNewAddress: PropTypes.func.isRequired,
};

export default AddressList;
