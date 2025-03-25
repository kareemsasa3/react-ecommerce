import axios from "axios";

export const createNewUser = async (user) => {
    const baseUrl = 'http://localhost:8080';
    const loginPath = '/api/users/';
    const loginEndpoint = baseUrl + loginPath;

    const response = await axios.post(loginEndpoint, user);
    return response;
};