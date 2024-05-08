import axios from "axios";

const instance = axios.create({
    baseURL: 'https://reqres.in'
});

// Add a response intercestor 
instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(">>> check respone:", response)
    return response.data ? response.data: {statusCode: response.status};
}, function(error) {
    // Any status code that falls outside the range of 2xx casue this function to trigger
    // Do something with response error
    let res = {};
    if(error.response) {
        // Request made and server responded
        res.data = error.response.data;
        res.status = error.response.status;
        res.headers = error.response.headers;  
    } else if (error.request) {
        // The request was made but no respone was received
        console.log(error.request);
    } else {
        // Something happened in setting up the te request that triggered an Error
        console.log('Error', error.message);
    }
    return res;
    // return Promise.reject(error);
}); 

export default instance;