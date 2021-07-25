import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + "/avatar";

const getUserAvatar = (username) => {
    return axios
        .get(API_URL + "/main?userName="+ username, { headers: authHeader() })
        .catch((error) => {
            return error.response;
        });
};

const getListAvatars = (username) => {
    return axios
        .get(API_URL + "/list?username="+ username, { headers: authHeader() })
        .catch((error) => {
            return error.response;
        });
};

const uploadAvatar = (username, file) => {
    return axios
        .post(API_URL +"?userName="+ username, file, { headers: authHeader() })
        .catch((error) => {
            return error.response;
        });
};

const deleteAvatar = (username, photoId) => {
    return axios
        .delete(API_URL + "/" + photoId +"?userName="+username, { headers: authHeader() })
        .catch((error) => {
            return error.response;
        });
};

const switchMain = (username, photoId) => {
    return axios
        .post(API_URL +"?userName="+ username +"&id="+photoId, { headers: authHeader() })
        .catch((error) => {
            return error.response;
        });
}

const AvatarService = {
    getUserAvatar,
    uploadAvatar,
    deleteAvatar,
    getListAvatars,
    switchMain,
};

export default AvatarService;
