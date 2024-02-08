import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const newInstance = axios.create();

newInstance.interceptors.request.use(async function (config) {
    const token = await AsyncStorage.getItem('ownerToken');
    config.headers.set('Authorization', token);
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export default newInstance;