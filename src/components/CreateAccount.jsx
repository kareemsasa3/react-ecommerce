import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Segment, Icon } from 'semantic-ui-react';
import { createNewUser } from '../api/spring/auth/createNewUser';
import PasswordChecklist from './PasswordChecklist';
import './CreateAccount.css';

const CreateAccount = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [rawUsername, setRawUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    setPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!passwordsMatch) {
      setError('Passwords do not match');
      return;
    }

    const newUser = {
      firstName,
      lastName,
      phoneNumber,
      email,
      rawUsername,
      password,
    };

    try {
      const response = await createNewUser(newUser);
      if (response.status === 201) {
        navigate('/login');
      } else {
        setError('Failed to create account');
      }
    } catch (err) {
      setError('An error occurred while creating the account');
    }
  };

  return (
    <div className="create-account-container">
      <Segment raised>
        <h2>CREATE ACCOUNT</h2>

        <Form onSubmit={handleFormSubmit} className="create-account-form">
          <Form.Group widths='equal'>
            <Form.Input
              label="First Name"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
            <Form.Input
              label="Last Name"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Input
            label="Phone Number"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />

          <Form.Input
            label="Username"
            placeholder="Choose a username"
            value={rawUsername}
            onChange={(e) => setRawUsername(e.target.value)}
            required
          />

          <Form.Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Form.Input
            label="Password"
            type='password'
            placeholder="Enter a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <PasswordChecklist password={password} />
          <Form.Input
            label="Confirm Password"
            type='password'
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            error={!passwordsMatch}
          />

          {!passwordsMatch && (
            <div className='password-feedback'>
              <Icon name="warning circle" color="red" />
              Passwords do not match.
            </div>
          )}

          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="submit-button">Create Account</button> 
        </Form>
        <p className='has-account'>
          Already have an account? <Link to="/login">Sign in here</Link>
        </p>
      </Segment>
    </div>
  );
};

export default CreateAccount;
