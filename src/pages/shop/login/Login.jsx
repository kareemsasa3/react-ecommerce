// Login.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Checkbox, Segment, Grid } from 'semantic-ui-react';
import { login } from '../../../redux/slices/authSlice';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(login({ email, password }));
      if (login.fulfilled.match(resultAction)) {
        navigate('/account'); // Redirect to the account page
      } else {
        console.error('Login failed:', resultAction.payload);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <Segment raised>
        <h2 className="heading">LOG IN</h2>
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
