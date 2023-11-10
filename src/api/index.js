import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// const BASE_URL = process.env.BASE_URL_SERVER;
// const BASE_URL = "http://192.168.100.47:4600";
const BASE_URL = "https://selest-backend-sifpu.ondigitalocean.app";

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 5000
});

const getUserTokenFromStorage = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        return token

    } catch (err) {
        console.log(err, "getUserTypeFromStorage")
    }
}

const api = async (url, method = 'GET', body = body ? body : null) => {

    const getToken = await getUserTokenFromStorage()

    const defaultToken = getToken !== null ? JSON.parse(getToken) : '';

    let Authorization = { Authorization: defaultToken };

    const options = {
        method,
        url,
        data: { 
            ...body,
        },
        headers: Authorization,
    };

    // console.log(options,"axios **************");
    try {
        const response = await axiosInstance(options);
        // console.log(response,"axios **************");
        if (response.data.status.code >= 200 && response.data.status.code <= 299) {
            return response.data.data;
        } else {
            throw new Error();
        }
    } catch (err) {
        console.log(err, "8989809088");
        if (err.response && err.response.data && err.response.data.error) {
            // server returned a custom error message
            throw new Error(`${err.response.data.error}`);
        }
        else if (
            err.response &&
            err.response.status >= 300 &&
            err.response.status <= 404
        ) {
            const errorMessage = `Request failed with status code ${err.response.status}: ${err.response.statusText}`;
            throw new Error(errorMessage);
        } else {
            console.log(err, "api catch errere")
            // other error occurred
            throw new Error(err.message);
        }
    }
};

export { BASE_URL, api, axiosInstance };
