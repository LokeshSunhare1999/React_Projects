import axios from "axios";
import { BASE_URL } from "../../Config/Constant";
import { decryptData, encryptData } from "../../utils/Helper";

export const instance = axios.create({
    baseURL: BASE_URL,
});

//- Add a request interceptor
instance.interceptors.request.use(
    function (config) {
        console.log("config", config.data);
        let userData = JSON.parse(localStorage.getItem('UserData'));
        //- Do something before request is sent
        if (config.data) {
            const { data } = config.data
            if (config.data instanceof FormData == false) {
                config.data = { data: { newData: encryptData(data) } };
            }
        }

        if (userData?.access_token) {
            config.headers['Authorization'] = `Bearer ${userData.access_token}`;
        }
        return config;
    },
    function (error) {
        //- Do something with request error
        return Promise.reject(error);
    }
);

//- Add a response interceptor
instance.interceptors.response.use(
    function (response) {
        console.log("interceptorresponse", response);

        //- return response;
        return decryptData(response.data);
    },
    function (error) {

        return Promise.reject(error);
    }
);

