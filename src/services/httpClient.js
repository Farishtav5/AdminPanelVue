import axios from 'axios'

// axiosInstance.interceptors.request.use(
//     config => {
//       config.headers.authorization = localStorage.getItem("token");
//       return config;
//     },
//     error => Promise.reject(error)
//   );

// const getAuthToken = () => localStorage.getItem('access_token');

// const authInterceptor = (config) => {
//     if (getAuthToken())
//         config.headers.common['Authorization'] = 'Bearer ' + getAuthToken();
//     return config;
    
// }
// let  headers = {
//     'Accept' : 'application/json',
//     'Content-Type': 'text/plain'
// }
// if(localStorage.getItem('access_token')) {
    
//     headers['Authorization'] = localStorage.getItem('access_token')
// }


const httpClient= axios.create({
        baseURL: process.env.VUE_APP_BASE_URL,
        timeout: 10000,
        withCredentials: false,
        // transformRequest: [(data) => JSON.stringify(data)],
        // headers: headers
        headers: {
            'Accept': 'application/json',
            // 'Access-Control-Allow-Origin': '*',
            
            // 'Content-Type': 'application/json'
            // 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            'Content-Type': 'text/plain', //not sending preflight requests for post 
            // 'Authorization': token
            // 'x-bluone-token': 'abc'
            // 'Authorization': localStorage.getItem('access_token') ? localStorage.getItem('access_token') : undefined
        }
    });

    // httpClient.interceptors.request.use(
    //     config => {
    //               config.headers.authorization = localStorage.getItem("access_token");
    //               return config;
    //             },
    //             error => Promise.reject(error)
    // );
    export default httpClient;