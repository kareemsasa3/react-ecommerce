import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Checkbox, Segment, Grid } from 'semantic-ui-react';
import { loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { fetchLoginResult } from '../api/spring/auth/fetchLoginResult';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    
    try {
      const response = await fetchLoginResult(email, password);
      console.log("Login response:", response);

      if (!response) {
        throw new Error("No data in login response!");
      }

      const { user, token } = response;
      
      if (rememberMe) {
        // Logic to remember the user (store token in localStorage, etc.)
      }

      dispatch(loginSuccess({ user, token }));
      console.log("Login successful!");

      navigate('/account'); // Redirect to the account page
    } catch (error) {
      dispatch(loginFailure());
      setError('Login failed. Please try again.');
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-container">
      <Segment raised>
        <h2 className="heading">LOG IN</h2>
        
        {error && <p className="error-message">{error}</p>} {/* Display error if needed */}

        <Form onSubmit={handleLogin}>
          <Form.Input
            label="Email Address"
            placeholder="Your Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Form.Input
            label="Password"
            placeholder="Your Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Grid>
            <Grid.Row columns={2} verticalAlign="middle">
              <Grid.Column textAlign="left">
                <Checkbox
                  label="Remember Me"
                  checked={rememberMe}
                  onChange={(e, data) => setRememberMe(data.checked)}
                />
              </Grid.Column>
              <Grid.Column textAlign="right">
                <Link to="/forgot-password">Forgot Password?</Link>
              </Grid.Column>
            </Grid.Row>
          </Grid>

          <button type="submit" className="login-button">LOG IN</button>
        </Form>

        <p className="no-account">
          Don't have an account? <Link to="/create-account">Create one</Link>
        </p>
      </Segment>
    </div>
  );
};

export default Login;
