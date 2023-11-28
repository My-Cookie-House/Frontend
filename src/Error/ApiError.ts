import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import {HTTP_ERROR_STATUS} from './HTTPErrorStatus';
import * as Sentry from '@sentry/react';

export class ApiError<T = unknown> extends Error implements AxiosError<T, any> {
  config: InternalAxiosRequestConfig;
  code?: string;
  request?: AxiosRequestConfig;
  response?: AxiosResponse<T>;
  isAxiosError: boolean;
  toJSON: () => any;
  name: string;
  error: AxiosError<T>;

  constructor(error: AxiosError<T>, apiFn?: string) {
    super(apiFn ?? error.message);
    this.error = error;
    const errorStatus = error.response?.status || 0;
    let name = 'ApiError';

    // 에러 Context 설정
    const {method, url, params, headers} = error.config;
    const {data, status} = error.response;

    Sentry.setTag(`${errorStatus}`, apiFn);

    Sentry.setContext('API 요청 내용', {
      method,
      url,
      params,
      token: headers.Authorization, // 입력된 토큰 정보
    });
    Sentry.setContext('API 응답 내용', {
      data,
      status,
    });

    switch (errorStatus) {
      case HTTP_ERROR_STATUS.UNAUTHORIZED: // 401
        name = `존재하지 않는 유저 `;
        break;
      case HTTP_ERROR_STATUS.UNKNOWN_SERVER_ERROR: // 500
        name = '알 수 없는 서버 에러';
        break;
    }
    this.config = error.config;
    this.name = name;
    this.stack = error.stack;
    this.code = error.code;
    this.request = error.request;
    this.response = error.response;
    this.isAxiosError = error.isAxiosError;
    this.toJSON = error.toJSON;
  }
}
