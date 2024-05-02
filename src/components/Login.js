import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Checkbox, Segment, Grid } from 'semantic-ui-react';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post('/api/login', { username, password });
      // Handle login success
      if (rememberMe) {
        // Logic to remember the user, like setting a cookie
      }
      // Redirect or indicate success
    } catch (e) {
      setError('Login failed. Please try again.');
    }
  };

  const handleCreateAccount = () => {
    // Logic for creating an account, usually a redirect to a different page
  };

  return (
    <div className="login-container">
      <Segment raised>
        <h2 className="heading">Login</h2> {/* Set heading color in CSS */}
        <Form onSubmit={handleLogin}>
          <Form.Input
            label="Email"
            placeholder="Enter your email"
            type="email"
            required
          />
          <Form.Input
            label="Password"
            placeholder="Enter your password"
            type="password"
            required
          />

          {/* Use a Grid to align the checkbox and link */}
          <Grid>
            <Grid.Row columns={2} verticalAlign="middle"> {/* Center elements vertically */}
              <Grid.Column textAlign="left">
                <Checkbox label="Remember Me" /> {/* Checkbox on the left */}
              </Grid.Column>
              <Grid.Column textAlign="right">
                <Link to="/forgot-password">Forgot Password?</Link> {/* Link on the right */}
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Button type="submit" className="login-button">Login</Button> {/* Login button */}
        </Form>
        <p>
          Don't have an account? <Link to="/create-account">Create one</Link>
        </p>
      </Segment>
    </div>
  );
};

export default Login;
