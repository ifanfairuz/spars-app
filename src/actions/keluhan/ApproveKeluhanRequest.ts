import Keluhan from "@store/models/Keluhan";
import { BaseParamsWithToken, BaseRequest, BaseResponse } from "@support/http";
import { HttpMethod } from "@support/http/contract/Request";

export class ApproveKeluhanParam extends BaseParamsWithToken {
  act: string = 'approveKeluhan'
  id_teknisi: string
  id_keluhan: string
  memo_katim: string = ''

  constructor(id_keluhan: string, id_teknisi: string, memo: string = '') {
    super();
    this.id_keluhan = id_keluhan;
    this.id_teknisi = id_teknisi;
    this.memo_katim = memo;
  }
}

export class ApproveKeluhanResponse extends BaseResponse {
  response: string = ''
}

export default class ApproveKeluhanRequest extends BaseRequest<ApproveKeluhanResponse, ApproveKeluhanParam> {

  constructor(id_keluhan: string, id_teknisi: string, memo: string = '') {
    super(HttpMethod.POST, 'svr_keluhan.php', new ApproveKeluhanParam(id_keluhan, id_teknisi, memo), ApproveKeluhanResponse);
  }

}