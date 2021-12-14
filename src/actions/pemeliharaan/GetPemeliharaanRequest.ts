import Pemeliharaan from "@store/models/Pemeliharaan";
import { BaseParamsWithToken, BaseRequest, BaseResponse } from "@support/http";
import { HttpMethod } from "@support/http/contract/Request";
import { CancelToken } from "axios";

export class GetPemeliharaanParam extends BaseParamsWithToken {
  act: string = 'data'
  date: string

  constructor(date: string) {
    super();
    this.date = date;
  }
}

export class GetPemeliharaanResponse extends BaseResponse {
  data: Pemeliharaan[] = []
}

export default class GetPemeliharaanRequest extends BaseRequest<GetPemeliharaanResponse, GetPemeliharaanParam> {

  constructor(date: string, cancelToken?: CancelToken) {
    super(HttpMethod.POST, 'svr_pemeliharaan.php', new GetPemeliharaanParam(date), GetPemeliharaanResponse);
    this.config = {
      cancelToken
    }
  }

}