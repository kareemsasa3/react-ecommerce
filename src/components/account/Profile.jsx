import React, { useState } from 'react';
import { Button, Grid, Label, Icon } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SideBar from '../SideBar';
import './Profile.css';

const Profile = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    console.log("User is not logged in");
    return null;
  }

  const handleEditProfile = () => {
    navigate('/profile'); // Navigate to edit profile page
  };

  const toggleSidebar = (event) => {
    setSidebarVisible(!isSidebarVisible); // Toggle the sidebar's visibility
  };

  const endpoints = [
    { path: '/profile', label: 'Edit Profile' },
    { path: '/addressbook', label: 'Address Book' },
    { path: '/saved-payments', label: 'Saved Payments' },
  ];

  return (
    <div className="profile-container">
      <div className="profile-header"> {/* Top header section */}
        <button
          className='transparent-button'
          onClick={toggleSidebar}
        >
          <Icon name="sliders horizontal" size="large" />
          <span className="profile-title">ACCOUNT MENU</span>
        </button>
      </div>
      <div className='profile-details'>
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column>
              <p className='profile'>PROFILE</p>
            </Grid.Column>
            <Grid.Column textAlign='right'>
              <button
                onClick={handleEditProfile}
                className='transparent-button'
              >
                <Icon name="pencil" />
                EDIT
              </button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Label>FIRST NAME</Label>
              <p>{user.firstName}</p>
            </Grid.Column>
            <Grid.Column>
              <Label>LAST NAME</Label>
              <p>{user.lastName}</p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column>
              <Label>EMAIL</Label>
              <p>{user.email}</p>
            </Grid.Column>
            <Grid.Column>
              <Label>PASSWORD</Label>
              <p>••••••••</p>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row columns={2}>
            <Grid.Column>
              <Label>PHONE NUMBER</Label>
              <p>{user.phoneNumber}</p>
            </Grid.Column>
            <Grid.Column>
              <Label>USERNAME</Label>
              <p>{user.normalizedUsername}</p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
      

      {isSidebarVisible && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarVisible(false)} // Close sidebar on click
        />
      )}

      {/* Sidebar with ref to track outside clicks */}
      <div className='sidebar'>
        <SideBar
          endpoints={endpoints}
          visible={isSidebarVisible} // Pass the sidebar visibility
          onClose={() => setSidebarVisible(false)} // Close the sidebar
        />
      </div>
    </div>
  );
};

export default Profile;
