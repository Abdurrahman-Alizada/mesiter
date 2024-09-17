import axios from 'axios';
import {MaxCdr_GUEST_TOKEN, USER_TOKEN} from './constants';
import {MAX_API_TIMEOUT} from './env';
import EncryptedStorage from 'react-native-encrypted-storage';

export const axiosInstance = axios.create({
  // Your default configurations
  timeout: MAX_API_TIMEOUT,
});

axiosInstance.interceptors.request.use(
  async config => {
    try {
      //make it dynamic
      let token = await EncryptedStorage.getItem(USER_TOKEN);
      token = token && JSON.parse(token) ;

      config.headers.Authorization = `token ${token}`;

      return config;
    } catch (error) {
      // Handle token retrieval error
      throw error;
    }
  },
  error => {
    return Promise.reject(error);
  },
);
