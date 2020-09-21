import httpClient from './httpClient';

const END_POINT = '/categories';

export default {
    get() {
        return httpClient.get(END_POINT)
    }
}