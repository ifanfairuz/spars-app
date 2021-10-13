import config, { Config } from '@config/app';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ClassConstructor, plainToClass } from 'class-transformer';
import Request, { HttpMethod } from '@support/http/contract/Request';
import Response from '@support/http/contract/Response';
import { ErrorException, NetworkErrorException } from '@support/http/exception';
import Params from '@support/http/contract/Params';
import { stringify } from 'query-string';
import { validate } from '@support/helpers/validation';

export default class Http {

  provider: AxiosInstance;
  config: Config;
  token: string = '';

  constructor() {
    this.provider = axios.create();
    this.config = config;
    this.settingRequest();
    this.settingResponse();
  }

  /**
   * setting request
   * @return {void}
   */
  protected settingRequest()
  {
    // Add a request interceptor
    this.provider.interceptors.request.use((conf: AxiosRequestConfig) => {
      // Do something before request is sent
      // Setting Base URL
      conf.baseURL = this.config.server.base_url;

      // Setting Headers
      if (!conf.headers) conf.headers = {};
      conf.headers['Accept'] = 'application/json';
      conf.headers['Content-Type'] = 'application/json';

      return conf;
    }, (error) => {
      // Do something with request error
      return Promise.reject(error);
    });
  }

  /**
   * setting response
   * @return {void}
   */
  protected settingResponse()
  {
    // Add a response interceptor
    this.provider.interceptors.response.use((response) => {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    }, (error) => {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    });
  }

  /**
   * post
   * @param {string} url
   * @param {object} data
   */
  protected post<T extends Response>(responseType: ClassConstructor<T> ,url: string, data: Params = {} as Params, config?: AxiosRequestConfig): Promise<T | ErrorException | any> {
    return this.provider.post(url, data, config)
    .then((res: AxiosResponse<any>) => {
      if (res.data) {
        if (res.data.status) {
          return plainToClass(responseType, res.data);
        }
        return Promise.reject(ErrorException.create(res.data, res));
      }
      return Promise.reject(ErrorException.create({
        status: false,
        message: 'No data response',
        error: 'ErrorRequest'
      }, res));
    })
    .catch(error => {
      if (axios.isCancel(error)) return Promise.reject(error);
      if (error instanceof ErrorException) return Promise.reject(error);

      if (error.config && error.response && error.response.data) {
        return Promise.reject(ErrorException.create(error.response.data, error));
      }

      if (error.message == 'Network Error') {
        const err = new NetworkErrorException(false, error.message);
        err.showErrorAlert();
        return Promise.reject(err);
      }

      return Promise.reject(error);
    });
  }

  /**
   * get
   * @param {string} url
   * @param {object} data
   */
  protected get<T extends Response>(responseType: ClassConstructor<T> ,url: string, config?: AxiosRequestConfig): Promise<T | ErrorException | any> {
    if (config?.params) config.params = undefined;
    return this.provider.get(url, config)
    .then((res: AxiosResponse<any>) => {
      if (res.data) {
        if (res.data.status) {
          return plainToClass(responseType, res.data);
        }
        return Promise.reject(ErrorException.create(res.data, res));
      }
      return Promise.reject(ErrorException.create({
        status: false,
        message: 'No data response',
        error: 'ErrorRequest'
      }, res));
    })
    .catch(error => {
      if (axios.isCancel(error)) return Promise.reject(error);
      if (error instanceof ErrorException) return Promise.reject(error);

      if (error.config && error.response && error.response.data) {
        return Promise.reject(ErrorException.create(error.response.data, error));
      }

      if (error.message == 'Network Error') {
        const err = new NetworkErrorException(false, error.message);
        err.showErrorAlert();
        return Promise.reject(err);
      }

      return Promise.reject(error);
    });
  }

  /**
   * execute
   */
  public execute<R extends Response, P extends Params>(request: Request<R, P>): Promise<R | ErrorException | any> {
    const validation = request.data ? validate(request.data.constructor(), request.data) : true;
    if (!validation) request.data = {} as P;
    if (request.method == HttpMethod.POST) {
      return this.post(request.response, `${request.prefix}${request.url}`, request.data, request.config);
    } else {
      const params = request.data ? '?' + stringify(request.data, { arrayFormat: 'index' }) : '';
      return this.get(request.response, `${request.prefix}${request.url}${params}`, request.config);
    }
  }
}