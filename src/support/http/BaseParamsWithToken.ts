import Params from "@support/http/contract/Params";

export default class BaseParamsWithToken implements Params {
  token: number = 0;
  token_mobile: number = 0;
  passcode: string = '';
}