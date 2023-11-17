import axios from 'axios';

export const instance = axios.create({
  baseURL:
    'http://ec2-13-125-210-236.ap-northeast-2.compute.amazonaws.com:8080',
});
