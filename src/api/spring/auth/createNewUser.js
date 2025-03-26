import axios from "axios";

export const createNewUser = async (user) => {
  const baseUrl = "spring-boot-ecommerce.railway.internal";
  const loginPath = "/api/users/";
  const loginEndpoint = baseUrl + loginPath;

  const response = await axios.post(loginEndpoint, user);
  return response;
};
