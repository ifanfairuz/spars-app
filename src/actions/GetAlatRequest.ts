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
}

export default class GetAlatRequest extends BaseRequest<GetAlatResponse, GetAlatParams> {
  
  constructor(key?: string, page: number = 1, cancelToken?: CancelToken) {
    super(HttpMethod.POST, 'svr_alat.php', new GetAlatParams(key, page), GetAlatResponse, { cancelToken });
  }

}