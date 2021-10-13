import Response from '@support/http/contract/Response';

export default class BaseResponse implements Response {
  message: string = '';
  status: boolean = false;
}