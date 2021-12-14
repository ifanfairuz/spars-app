import { BaseParamsWithToken, BaseRequest, BaseResponse } from "@support/http";
import { File } from "@support/http/contract/Params";
import { HttpMethod } from "@support/http/contract/Request";

export class AddPemeliharaanParam extends BaseParamsWithToken {
  act: string = 'addPemeliharaan'
  tipe_pemeliharaan: string
  id_alat_detail: string
  id_teknisi: string
  interval: 'manual' | 'auto'
  interval_day: number
  str_date: string
  end_date: string
  catatan_katim: string
  berkas_1?: File
  berkas_2?: File
  berkas_3?: File

  constructor(data: any) {
    super();
    this.tipe_pemeliharaan = 'tipe_pemeliharaan' in data ? data.tipe_pemeliharaan : '';
    this.id_alat_detail = 'id_alat_detail' in data ? JSON.stringify(data.id_alat_detail) : JSON.stringify({ data: [] });
    this.id_teknisi = 'id_teknisi' in data ? data.id_teknisi : '';
    this.interval = 'interval' in data ? data.interval : 'auto';
    this.interval_day = 'interval_day' in data ? data.interval_day : 0;
    this.str_date = 'str_date' in data ? data.str_date : '';
    this.end_date = 'end_date' in data ? data.end_date : '';
    this.catatan_katim = 'catatan_katim' in data ? data.catatan_katim : '';
    this.berkas_1 = 'berkas_1' in data ? data.berkas_1 : undefined;
    this.berkas_2 = 'berkas_2' in data ? data.berkas_2 : undefined;
    this.berkas_3 = 'berkas_3' in data ? data.berkas_3 : undefined;
    this.token = 0;
  }
}

export class AddPemeliharaanResponse extends BaseResponse {
  response: string = ''
}

export default class AddPemeliharaanRequest extends BaseRequest<AddPemeliharaanResponse, AddPemeliharaanParam> {

  constructor(data: any) {
    super(HttpMethod.POST, 'svr_pemeliharaan.php', new AddPemeliharaanParam(data), AddPemeliharaanResponse);
  }

}