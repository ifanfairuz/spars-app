import Response from '@support/http/contract/Response';

export default class BaseResponse implements Response {
  msg: string = '';
  respon: any;
}