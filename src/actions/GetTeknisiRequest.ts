import { BaseParamsWithToken, BaseRequest, BaseResponse } from "@support/http";
import { HttpMethod } from "@support/http/contract/Request";
import Teknisi from "@store/models/Teknisi";

export class GetTeknisiParams extends BaseParamsWithToken {
  act: string = 'data'
  type: string = 'teknisi'
}

export class GetTeknisiResponse extends BaseResponse {
  data: Array<Teknisi> = [];
}

export default class GetTeknisiRequest extends BaseRequest<GetTeknisiResponse, GetTeknisiParams> {
  
  constructor() {
    super(HttpMethod.POST, 'svr_users.php', new GetTeknisiParams(), GetTeknisiResponse);
  }

}