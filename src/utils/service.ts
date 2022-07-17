import axios from "axios";
import UserService from "./userService";
import _kc from "../main/Keycloak";

const Methods = {
    GET: 'GET',
    POST: 'POST',
    DELETE: 'DELETE',
};

const axiosInstance = axios.create();

const configure = () => {
    axiosInstance.interceptors.request.use((config) => {
        if (UserService.isLoggedIn()) {
            console.log(_kc.idToken, "token");
            const cb = () => {
                // @ts-ignore
                config.headers.Authorization = `Bearer ${UserService.getToken()}`;
                return Promise.resolve(config);
            };
            return UserService.updateToken(cb);
        }
    });
};

const getAxiosClient = () => axiosInstance;

const Service = {
    Methods,
    configure,
    getAxiosClient,
};

export default Service;