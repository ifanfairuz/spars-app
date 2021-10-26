import { BaseParamsWithToken, BaseRequest, BaseResponse } from "@support/http";
import { HttpMethod } from "@support/http/contract/Request";

export class DashboardKatimParam extends BaseParamsWithToken {
  act: string = 'sumReportKatim'
  date: string = ''

  constructor(date: string) {
    super();
    this.date = date;
  }
}

export class DashboardKatimResponse extends BaseResponse {
  keluhan = {
    kel_total: '0',
    kel_selesai: '0',
    persentase: '0%'
  }
}

export default class DashboardKatimRequest extends BaseRequest<DashboardKatimResponse, DashboardKatimParam> {

  constructor(date: string) {
    super(HttpMethod.POST, 'svr_dashboard.php', new DashboardKatimParam(date), DashboardKatimResponse);
  }

}