import { delete_session, get_session, store_session } from "@store/session";
import http, { BaseParams, BaseRequest, BaseResponse } from "@support/http";

class LoginParams extends BaseParams {
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

class LoginResponse extends BaseResponse {
  respon: Array<any> = [];

  get user() {
    if (!(this.respon instanceof Array)) return undefined;
    return this.respon.length > 0 ? this.respon[0] : undefined;
  }
}

export async function login(username: string, password: string) {
  const param = new LoginParams(username, password);
  const request = BaseRequest.post('login.php', param, LoginResponse);
  const response = await http.execute(request).catch(() => undefined);
  if (response && response instanceof LoginResponse) {
    await store_session({ user: response.user });
    return response.user;
  }

  return undefined;
}

export async function logout() {
  await delete_session();
  return true;
}

export async function getUser() {
  const session = await get_session('user');
  return session;
}

export default {
  login,
  logout,
  getUser
}