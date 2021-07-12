import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + "/Users";
const searchUser = (key) => {
    return axios
        .get(
            API_URL +
            "?key=" +
            key,
            {headers : authHeader() }
        )
        .catch((error) => {
            return error.response;
        });
};

const getProfile = (Username) => {
    return axios
        .get(
            API_URL +
            "/profile?key=" +
            Username,
            {headers : authHeader() }
        )
        .catch((error) => {
            return error.response;
        });
};

const changePassword = (UserName, CurrentPassword, NewPassword, NewPasswordConfirm) => {
    return axios
        .put(
            API_URL +
            "changePassword",
            {
                UserName,
                CurrentPassword,
                NewPassword,
                NewPasswordConfirm
            },
            {headers : authHeader() }
        )
        .catch((error) => {
        return error.response;
    });
};
const UserService = {
    searchUser,
    getProfile,
    changePassword,
};

export default UserService;