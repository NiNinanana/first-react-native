import axios from 'axios';
import {Platform} from 'react-native';

export const api = axios.create({
  withCredentials: true,
  // android는 이러헥 바꿔서 보내야함. ios는 localhost
  baseURL:
    Platform.OS === 'android'
      ? 'http://10.0.2.2:3030'
      : 'http://localhost:3030',
});
