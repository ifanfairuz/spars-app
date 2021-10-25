import Keluhan from "@store/models/Keluhan";
import { BaseParamsWithToken, BaseRequest, BaseResponse } from "@support/http";
import { HttpMethod } from "@support/http/contract/Request";
import { CancelToken } from "axios";

export class GetKeluhanParam extends BaseParamsWithToken {
  act: string = 'dataKeluhan'
  show_all: boolean
  key?: string

  constructor(filter: { only_me: boolean, search: string } = { only_me: true, search: '' }) {
    super();
    this.show_all = !filter.only_me;
    this.key = filter.search != '' ? filter.search : undefined;
  }
}

export class GetKeluhanResponse extends BaseResponse {
  datas: Array<Keluhan> = [];
}

export default class GetKeluhanRequest extends BaseRequest<GetKeluhanResponse, GetKeluhanParam> {

  constructor(search: string = '', only_me: boolean = true, cancelToken?: CancelToken) {
    super(HttpMethod.POST, 'svr_keluhan.php', new GetKeluhanParam({ only_me, search }), GetKeluhanResponse, {
      cancelToken
    });
  }

}