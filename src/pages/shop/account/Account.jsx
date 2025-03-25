import React from "react";
import { useSelector } from "react-redux";
import Profile from "../../../components/account/Profile";
import AddressBook from "../../../components/account/AddressBook";
import "./Account.css";

const selectUser = (state) => state.auth.user; // Select user object

const Account = () => {
    const user = useSelector(selectUser); // Get user object from Redux store

    if (!user) { // Check if user exists
        return <div>No user found!</div>;
    };

    return (
        <div className="user-container">
            <h1 className="my-account">MY ACCOUNT</h1>
            <div className="profile-segment">
                <Profile user={user} /> {/* Pass user object to Profile component */}
            </div>
            <div className="address-book-segment">
                <AddressBook userId={user.id} /> {/* Pass userId to AddressBook component */}
            </div>
        </div>
    );
};

export default Account;
