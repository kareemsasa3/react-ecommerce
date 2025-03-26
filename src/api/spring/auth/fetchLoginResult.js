import axios from "axios";

const baseUrl = "spring-boot-ecommerce.railway.internal";
const loginPath = "/api/auth/login";
const loginEndpoint = baseUrl + loginPath;

const fetchLoginResult = async (email, password) => {
  try {
    const response = await axios.post(loginEndpoint, {
      email,
      password,
    });

    const { token, user } = response.data;

    // Save token and user to local storage
    localStorage.setItem("jwtToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    return response.data;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;

      if (status === 401) {
        throw new Error("Invalid credentials");
      }

      throw new Error(`Login failed: ${data}`);
    } else if (error.request) {
      throw new Error("No response from server");
    } else {
      throw new Error(`Error: ${error.message}`);
    }
  }
};

export default fetchLoginResult;
