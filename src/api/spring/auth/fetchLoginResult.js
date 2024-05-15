import axios from 'axios';

export const fetchLoginResult = async (email, password) => {
  const baseUrl = 'http://localhost:8080';
  const loginPath = '/api/auth/login';
  const loginEndpoint = baseUrl + loginPath;

  try {
    const response = await axios.post(loginEndpoint, {
      email: email,
      password: password
    });

    const token = response.data.token;

    localStorage.setItem('jwtToken', token);

    return response.data;
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const errorMessage = error.response.data;

      if (status === 401) {
        throw new Error('Invalid credentials');
      }

      throw new Error(`Login failed: ${errorMessage}`);
    } else if (error.request) {
      throw new Error('No response from server');
    } else {
      throw new Error(`Error: ${error.message}`);
    }
  }
};
