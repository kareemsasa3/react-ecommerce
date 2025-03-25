import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Segment, Icon } from 'semantic-ui-react';
import SideBar from '../../../components/SideBar';
import { createNewAddress } from '../../../api/spring/auth/createNewAddress';
import './CreateAddress.css';
import AddressInput from '../../../components/account/AddressInput';

const selectUserId = (state) => state.auth.user ? state.auth.user.id : null;

const CreateAddress = () => {
    const userId = useSelector(selectUserId);

    const [addressName, setAddressName] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [streetAddress, setStreetAddress] = useState('');
    const [apartmentSuite, setApartmentSuite] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [country, setCountry] = useState('');
    const [defaultShipping, setDefaultShipping] = useState(false);
    const [defaultBilling, setDefaultBilling] = useState(false);

    const [error, setError] = useState(null);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsSidebarVisible(!isSidebarVisible);
    };

    const endpoints = [
        { path: '/profile', label: 'Edit Profile' },
        { path: '/addressbook', label: 'Address Book' },
        { path: '/saved-payments', label: 'Saved Payments' },
    ];

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const newAddress = {
            addressName,
            firstName,
            lastName,
            streetAddress,
            apartmentSuite,
            city,
            state,
            zipCode,
            country,
            defaultBilling,
            defaultShipping
        };

        try {
            const response = await createNewAddress(userId, newAddress);
            if (response.status === 201) {
                navigate('/account');
            } else {
                setError('Failed to create address');
            }
        } catch (err) {
            setError('An error occurred while creating the account');
        }
    };

    const handleSelectAddress = (selectedAddress) => {
        const { address } = selectedAddress;
        setStreetAddress(address);
    };

    return (
        <div className='page-container'>
            <div className="create-address-container">
                <p className='address-book-title'>ADDRESS BOOK</p> {/* Top header section */}
                <div className='account-details'>
                    <Segment>
                        <div className="account-header"> {/* Top header section */}
                            <button
                                className='transparent-button'
                                onClick={toggleSidebar}
                            >
                                <Icon name="sliders horizontal" size="large" />
                                <span className="account-title">ACCOUNT MENU</span>
                            </button>
                        </div>
                        <div className='create-address-form'>
                            <Form onSubmit={handleFormSubmit}>
                                <Form.Input
                                    label="Address Name"
                                    value={addressName}
                                    onChange={(e) => setAddressName(e.target.value)}
                                    required
                                />
                                <Form.Input
                                    label="First Name"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                />
                                <Form.Input
                                    label="Last Name"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                />
                                <AddressInput onSelectAddress={handleSelectAddress} />
                                <Form.Input
                                    label="Apartment, Suite, Etc. (Optional)"
                                    value={apartmentSuite}
                                    onChange={(e) => setApartmentSuite(e.target.value)}
                                />
                                <Form.Input
                                    label="City"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    required
                                />
                                <Form.Input
                                    label="State"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    required
                                />
                                <Form.Input
                                    label="ZIP Code"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    required
                                />
                                <Form.Input
                                    label="Country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    required
                                />
                                <Form.Group widths='equal'>
                                    <Form.Checkbox
                                        label="Default Shipping Address"
                                        checked={defaultShipping}
                                        onChange={() => setDefaultShipping(!defaultShipping)}
                                    />
                                    <Form.Checkbox
                                        label="Default Billing Address"
                                        checked={defaultBilling}
                                        onChange={() => setDefaultBilling(!defaultBilling)}
                                    />
                                </Form.Group>
                                <button type="submit" className="submit-button">SAVE ADDRESS</button>
                                <button type="button" className="cancel-button" onClick={() => navigate('/account')}>CANCEL</button>
                            </Form>
                        </div>
                        {error && <p className="error-message">{error}</p>}
                    </Segment>
                </div>
                {isSidebarVisible && (
                    <button
                        className="sidebar-overlay"
                        onClick={() => setIsSidebarVisible(false)} // Close sidebar on click
                    />
                )}

                <div className='sidebar'>
                    <SideBar
                        endpoints={endpoints}
                        visible={isSidebarVisible} // Pass the sidebar visibility
                        onClose={() => setIsSidebarVisible(false)} // Close the sidebar
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateAddress;
