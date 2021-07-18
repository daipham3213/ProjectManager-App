
import axios from "axios";

export default function authHeader() {
    const token = localStorage.getItem("token");
    axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
    if (token) {
        return {Authorization: "Bearer " + token, withCredentials: true, 'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS', 'content-type': 'application/json'};
    } else {
        return {};
    }
}
