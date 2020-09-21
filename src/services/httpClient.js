import axios from 'axios'

const getAuthToken = () => localStorage.getItem('access_token');

const authInterceptor = (config) => {
    if (getAuthToken())
        config.headers.common['Authorization'] = 'Bearer ' + getAuthToken();
    return config;
    
}

const httpClient= axios.create({
        baseURL: process.env.VUE_APP_BASE_URL,
        timeout: 10000,
        withCredentials: false,
        // transformRequest: [(data) => JSON.stringify(data)],
        // headers: headers
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            // 'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            // 'Content-Type': 'text/plain', //not sending preflight requests for post 
            // 'Authorization': token
            // 'x-bluone-token': 'abc'
            // 'Authorization': 'Bearer '+ localStorage.getItem('access_token') ? localStorage.getItem('access_token') : undefined
        }
    });

    httpClient.interceptors.request.use(authInterceptor);
    export default httpClient;