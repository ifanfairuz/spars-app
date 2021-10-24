import { BaseParams, BaseRequest, BaseResponse } from "@support/http";
import { HttpMethod } from "@support/http/contract/Request";

export class LoginParams extends BaseParams {
  act: string = 'login'
  from: string = 'mobile'
  username: string 
  password: string

  constructor(username: string, password: string) {
    super();
    this.username = username;
    this.password = password;
  }
}

export class LoginResponse extends BaseResponse {
  respon: Array<any> = [];

  get user() {
    if (!(this.respon instanceof Array)) return undefined;
    return this.respon.length > 0 ? this.respon[0] : undefined;
  }
}

export default class LoginRequest extends BaseRequest<LoginResponse, LoginParams> {
  
  constructor(username: string, password: string) {
    super(HttpMethod.POST, 'login.php', new LoginParams(username, password), LoginResponse);
  }

}