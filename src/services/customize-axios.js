import axios from "axios";

const instance = axios.create({
    baseURL: 'https://reqres.in'
});

// Add a response intercestor 
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function(error) {
    // Any status code that falls outside the range of 2xx casue this function to trigger
    // Do something with response error
    return Promise.reject(error);
}); 

export default instance;