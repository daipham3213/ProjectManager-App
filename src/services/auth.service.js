import axios from "axios";
import Cookies from 'js-cookie';

const API_URL = process.env.REACT_APP_API_URL + "/User";

const register = (username, password, email, name, phoneNumber) => {
    return axios
        .post(API_URL, {
            username,
            password,
            email,
            name,
            phoneNumber
        })
        .catch((error) => {
            return error.response;
        });
};

const login = (username, password, rememberme) => {
    return axios
        .post(API_URL + "/authenticate", {
            username,
            password,
            rememberme,
        })
        .catch((error) => {
            return error.response;
        });
};

const isLoggedIn = () => {
    const token = localStorage.getItem("token");
    return !!token;

};

const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("data");
};

const getCurrentUser = () => {
    return localStorage.getItem("username");
};

const refreshToken = () => {
    return axios
        .post(
            API_URL +
            "/refresh-token"
        )
        .catch((error) => {
        return error.response;
    });
};

const revokeToken = () => {
    let token = Cookies.get('refresh-token')
    return  axios
        .post(
            API_URL +
            "/revoke-token",
            {token}
        )
        .catch((error) => {
            return error.response;
        });
};

const AuthService = {
    register,
    login,
    isLoggedIn,
    logout,
    getCurrentUser,
    refreshToken,
    revokeToken,
};

export default AuthService;
