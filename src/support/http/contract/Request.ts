import { AxiosRequestConfig } from 'axios';
import { ClassConstructor } from 'class-transformer';
import Params from './Params';
import Response from './Response';

export enum HttpMethod { POST, GET }
export default interface Request<T extends Response, P extends Params> {
  method: HttpMethod
  url: string
  data?: P
  config?: AxiosRequestConfig
  response: ClassConstructor<T>
  prefix: string
  setup(): Promise<void>
}