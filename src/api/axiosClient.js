
import axios from 'axios';
import queryString from 'query-string';

import apiConfig from './apiConfig';

const axiosClient = axios.create({
    baseURL: apiConfig.baseUrl,
    headers: {
        Accept: 'application/json',
        // 'Authorization': 'Bearer ' + apiConfig.apiKey
    },
    // paramsSerializer: params => queryString.stringify({...params, api_key: apiConfig.apiKey})
});

export default axiosClient;