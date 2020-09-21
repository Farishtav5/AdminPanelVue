import httpClient from './httpClient';

const END_POINT = '/news';

export default {
    getNews() {
        return httpClient.get(END_POINT)
    },
    addNews(data) {
        return httpClient.post(END_POINT,data)
    }
}