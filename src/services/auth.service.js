import axios from "axios";
import moment from "moment";
import authHeader from "./auth-header";
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
        }, {headers: authHeader()})
        .catch((error) => {
            return error.response;
        });
};

const isLoggedIn = () => {
    let token;
    const exp = localStorage.getItem("expTime");
    const nowTime = moment();
    const clientTime = moment(exp);

    if (exp !== null && nowTime>clientTime)
        refreshToken().then((r) => {
            if (r.status !== 200) {
               revokeToken().then((r) => {
                   if(r.status !== 200){
                       logout();
                       token = localStorage.getItem("token");
                       alert("Please re-login. For security reason.");
                   }
               })
            } else {
                saveLogin(r.data);
                console.log("token refreshed");
            }
            ;
        }).catch((r) => {
            console.log(r);
        });
    else token = localStorage.getItem("token");
    return !!token;
};

const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("id");
    localStorage.removeItem("expTime");
    localStorage.removeItem("refreshToken");
};

const saveLogin = (response) => {
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("username", response.data.userName);
    localStorage.setItem("roles", response.data.roleName);
    localStorage.setItem("id", response.data.id);
    localStorage.setItem("expTime", response.data.expTime);
    localStorage.setItem("refreshToken",response.data.refreshToken);
}

const getCurrentUser = () => {
    return localStorage.getItem("username");
};

const refreshToken = () => {
    let token = localStorage.getItem("refreshToken");
    return axios
        .post(
            API_URL +
            "/refresh-token?token=" + token,
            {header: authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
};

const revokeToken = () => {
    let token = localStorage.getItem("refreshToken");
    return axios
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
    saveLogin,
};

export default AuthService;
