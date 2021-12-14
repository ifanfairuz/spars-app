import { BaseParamsWithToken, BaseRequest, BaseResponse } from "@support/http";
import { HttpMethod } from "@support/http/contract/Request";
import Alat from "@store/models/Alat";
import { CancelToken } from "axios";

export class GetAlatParams extends BaseParamsWithToken {
  act: string = 'dataAlat'
  page?: number
  key?: string
  
  constructor(key?: string, page: number = 1) {
    super();
    this.page = page;
    this.key = key || '';
  }
}

export class GetAlatResponse extends BaseResponse {
  data: Array<Alat> = [];
  page: number = 1;
  current: number = 1;

  toDataOptionsAlat<T extends any>(maping = (a: Alat) => a as T) {
    return {
      page: this.page,
      current: this.current,
      data: this.data.map(maping),
    }
  }
}

export default class GetAlatRequest extends BaseRequest<GetAlatResponse, GetAlatParams> {
  
  constructor(key?: string, page: number = 1, cancelToken?: CancelToken) {
    super(HttpMethod.POST, 'svr_alat.php', new GetAlatParams(key, page), GetAlatResponse, { cancelToken });
  }

}