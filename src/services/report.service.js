import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL + "/Report";

const getList = (projectId) => {
    return axios
        .get(
            API_URL + "?projectId=" + projectId,
            {headers : authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
};

const postReport = (name, remark, startDate, dueDate, progress, projectId, groupId) => {
    return axios
        .post(
            API_URL,
            {name, remark, startDate, dueDate, progress, projectId, groupId},
            {headers : authHeader()}
        )
};

const putReport = (id, name, remark, startDate, dueDate, progress, groupName, projectName) => {
    let url = API_URL + "/" +id;
    return axios
        .post(
            API_URL + "/" +id,
            {name, url, remark, startDate, dueDate, progress, groupName, projectName},
            {headers : authHeader()}
        )
};

const deleteReport = (projectId) => {
    return axios
        .delete(
            API_URL + "?projectId=" + projectId,
            {headers : authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
};

const getDetails = (projectId) => {
    return axios
        .get(
            API_URL + "?projectId=" + projectId,
            {headers : authHeader()}
        )
        .catch((error) => {
            return error.response;
        });
};

const ReportService = {
    getList,
    postReport,
    getDetails,
    deleteReport,
    putReport,
};

export default ReportService;