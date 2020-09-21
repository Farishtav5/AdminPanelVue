import httpClient from './httpClient';

const END_POINT = '/login';

export default {
    userLogin (data) {
        return httpClient.post(END_POINT, data)
    }
}