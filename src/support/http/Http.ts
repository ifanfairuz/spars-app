import config, { Config } from '@config/app';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ClassConstructor, plainToClass } from 'class-transformer';
import Request, { HttpMethod } from '@support/http/contract/Request';
import Response from '@support/http/contract/Response';
import { ErrorException, NetworkErrorException } from '@support/http/exception';
import Params from '@support/http/contract/Params';
import { stringify } from 'query-string';
import { validate } from '@support/helpers/validation';
import { ParamToFormData } from '@support/helpers/functions';
import UnauthErrorException from './exception/UnauthErrorException';

export default class Http {

  provider: AxiosInstance;
  config: Config;
  onLogout?: () => void;

  constructor() {
    this.provider = axios.create();
    this.config = config;
    this.settingRequest();
    this.settingResponse();
  }

  /**
   * set logout handler
   */
  public setLogoutHandler(handler: () => void) {
    this.onLogout = handler;
  }

  /**
   * logout
   */
  public logout() {
    if (this.onLogout) this.onLogout();
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
      conf.headers['Content-Type'] = 'multipart/form-data';
      

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
   * @param {ClassConstructor} url
   * @param {string} url
   * @param {object} data
   * @param {AxiosRequestConfig|undefined} config
   */
  protected post<T extends Response>(responseType: ClassConstructor<T>, url: string, param: Params = {} as Params, config?: AxiosRequestConfig): Promise<T> {
    return this.provider.post(url, ParamToFormData(param), config)
    .then((res: AxiosResponse<any>) => {
      if (res.data instanceof Array) {
        return plainToClass(responseType, { datas: res.data });
      } else if (res.data instanceof Object) {
        if (res.data.msg == 'maaf anda harus login kembali') {
          const exceptionUnauth = new UnauthErrorException(false, res.data.message || res.data.msg, res.data.error);
          exceptionUnauth.showErrorAlert(this.logout.bind(this));
          return Promise.reject(exceptionUnauth);
        }
        return plainToClass(responseType, res.data);
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
        let exception = ErrorException.create(error.response.data, error);
        if (error.response.data.msg == 'maaf anda harus login kembali') {
          const exceptionUnauth = new UnauthErrorException(false, error.response.data.message || error.response.data.msg, error.response.data.error, error);
          exceptionUnauth.showErrorAlert(this.logout.bind(this));
          exception = exceptionUnauth;
        }
        return Promise.reject(exception);
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
   * @param {ClassConstructor} url
   * @param {string} url
   * @param {AxiosRequestConfig|undefined} config
   */
  protected get<T extends Response>(responseType: ClassConstructor<T>, url: string, config?: AxiosRequestConfig): Promise<T> {
    if (config?.params) config.params = undefined;
    return this.provider.get(url, config)
    .then((res: AxiosResponse<any>) => {
      if (res.data instanceof Array) {
        return plainToClass(responseType, { datas: res.data });
      } else if (res.data instanceof Object) {
        if (res.data.msg == 'maaf anda harus login kembali') {
          const exceptionUnauth = new UnauthErrorException(false, res.data.message || res.data.msg, res.data.error);
          exceptionUnauth.showErrorAlert(this.logout.bind(this));
          return Promise.reject(exceptionUnauth);
        }
        return plainToClass(responseType, res.data);
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
        let exception = ErrorException.create(error.response.data, error);
        if (error.response.data.msg == 'maaf anda harus login kembali') {
          const exceptionUnauth = new UnauthErrorException(false, error.response.data.message || error.response.data.msg, error.response.data.error, error);
          exceptionUnauth.showErrorAlert(this.logout.bind(this));
          exception = exceptionUnauth;
        }
        return Promise.reject(exception);
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
  public async execute<R extends Response, P extends Params>(request: Request<R, P>): Promise<R> {
    await request.setup();
    // const validation = request.data ? validate(request.data.constructor(), request.data) : true;
    // if (!validation) request.data = {} as P;
    if (request.method == HttpMethod.POST) {
      return await this.post(request.response, `${request.prefix}${request.url}`, request.data, request.config);
    } else {
      const params = request.data ? '?' + stringify(request.data, { arrayFormat: 'index' }) : '';
      return await this.get(request.response, `${request.prefix}${request.url}${params}`, request.config);
    }
  }
}