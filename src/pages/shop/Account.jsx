import React from "react";

import Profile from "../../components/account/Profile";
import "./Account.css";

const Account = () => {
    return (
        <div className="user">
            <h1 className="my-account">MY ACCOUNT</h1>
            <Profile />
        </div>
    );
};

export default Account;