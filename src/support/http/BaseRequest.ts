import { AxiosRequestConfig } from "axios";
import { ClassConstructor } from "class-transformer";
import Request, { HttpMethod } from "@support/http/contract/Request";
import Response from "@support/http/contract/Response";
import Params from "@support/http/contract/Params";

export default class BaseRequest<R extends Response, P extends Params> implements Request<R, P> {
  method: HttpMethod;
  url: string;
  data?: P;
  config?: AxiosRequestConfig;
  response: ClassConstructor<R>;
  prefix: string = '/';

  constructor(method: HttpMethod, url: string, response: ClassConstructor<R>, config?: AxiosRequestConfig)
  {
    this.method = method;
    this.url = url;
    this.config = config;
    this.response = response;
  }

  setData(data: P)
  {
    this.data = data;
  }
  
}