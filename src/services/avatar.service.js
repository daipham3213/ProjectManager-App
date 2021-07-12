import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + "/avatars/";

const getUserAvatar = (username) => {
    return axios
        .get(API_URL + username + "/main", { headers: authHeader() })
        .catch((error) => {
            return error.response;
        });
};

const uploadAvatar = (username, file) => {
    return axios
        .post(API_URL + username, file, { headers: authHeader() })
        .catch((error) => {
            return error.response;
        });
};

const deleteAvatar = (username, photoId) => {
    return axios
        .delete(API_URL + username + "/" + photoId, { headers: authHeader() })
        .catch((error) => {
            return error.response;
        });
};

const AvatarService = {
    getUserAvatar,
    uploadAvatar,
    deleteAvatar,
};

export default AvatarService;
