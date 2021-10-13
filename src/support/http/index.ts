import Http from "./Http";
import BaseRequest from "./BaseRequest";
import BaseResponse from "./BaseResponse";
import BaseParams from "./BaseParams";
import {
  ErrorException,
  NetworkErrorException
} from "./exception/index";

const http = new Http();
export {
  Http,
  BaseRequest,
  BaseResponse,
  BaseParams,

  ErrorException,
  NetworkErrorException
}
export default http;