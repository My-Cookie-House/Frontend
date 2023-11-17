import axios from 'axios';

export const instance = axios.create({
  baseURL: 'ec2-3-35-218-95.ap-northeast-2.compute.amazonaws.com:8080',
});
