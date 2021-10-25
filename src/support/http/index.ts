import Http from "./Http";
import BaseRequest from "./BaseRequest";
import BaseResponse from "./BaseResponse";
import BaseParams from "./BaseParams";
import BaseParamsWithToken from "./BaseParamsWithToken";
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
  BaseParamsWithToken,

  ErrorException,
  NetworkErrorException
}
export default http;