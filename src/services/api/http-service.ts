import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { env } from 'configs';
import { ErrorCode, ResponseModel } from 'models';
import { logd, loge, toJSONStr } from 'shared';

const TAG = 'http-service';

type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH';

const BaseHeaders: any = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export class HttpService {
  private static extraHeaders: any = {};

  private static endPoint(api: string): string {
    return `${env.host}${api}`;
  }

  private static handleHttpResponseError(error: AxiosError): ResponseModel {
    // handle error
    if (error.response) {
      // the request was made and the server responsed with a status code
      // that falls out of the range of 2xx
      const { data, status, config } = error.response;
      const { method, url } = config;
      const errorCode = data.errorCode || ErrorCode.Unknow;

      const response: ResponseModel = {
        status,
        errorCode,
        data: {},
      };
      loge(TAG, `ERROR ${errorCode} ${method} ${url}: ${toJSONStr(data)}`);

      return response;
    } else {
      const response: ResponseModel = {
        status: error.request.status,
        errorCode: +(error.code || '') || ErrorCode.Unknow,
        data: {},
      };
      loge(TAG, `ERROR unknown: ${toJSONStr(response)}`);
      return response;
    }
  }

  private static async send(
    method: Method,
    api: string,
    body?: any,
    fullUrl?: string
  ): Promise<ResponseModel> {
    // const timeout = 2 * 60 * 1000;
    const url = fullUrl || this.endPoint(api);

    try {
      const requestConfig: AxiosRequestConfig = {
        method,
        url,
        data: body,
        headers: {
          ...BaseHeaders,
          ...this.extraHeaders,
        },
      };
      const response = await axios(requestConfig);
      const { status, data } = response;
      logd(TAG, `RESPONSE ${status} ${method} ${url}: ${toJSONStr(data)}`);
      return {
        status,
        data: data || {},
      };
    } catch (error: any) {
      return this.handleHttpResponseError(error);
    }
  }

  static async post(api: string, body?: any): Promise<ResponseModel> {
    return this.send('POST', api, body);
  }

  static async put(api: string, body?: any): Promise<ResponseModel> {
    return this.send('PUT', api, body);
  }

  static async delete(api: string): Promise<ResponseModel> {
    return this.send('DELETE', api);
  }

  static async get(api: string, body?: any): Promise<ResponseModel> {
    return this.send('GET', api, body);
  }
}
