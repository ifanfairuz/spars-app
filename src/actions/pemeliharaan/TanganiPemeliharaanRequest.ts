import { BaseParamsWithToken, BaseRequest, BaseResponse } from "@support/http";
import { File } from "@support/http/contract/Params";
import { HttpMethod } from "@support/http/contract/Request";

export class TanganiPemeliharaanParam extends BaseParamsWithToken {
  act: string = 'pemeliharaan'
  id_pemeliharaan: string
  id_system: string
  id_teknisi: string
  pihak_ketiga: string
  catatan: string
  hasil_pemeliharaan: string
  foto_1?: string
  foto_2?: string
  foto_3?: string
  upload_berkas_1?: File
  upload_berkas_2?: File
  upload_berkas_3?: File

  constructor(data: any) {
    super();
    this.id_pemeliharaan = 'id_pemeliharaan' in data ? data.id_pemeliharaan : '';
    this.id_system = 'id_system' in data ? data.id_system : '';
    this.id_teknisi = 'id_teknisi' in data ? data.id_teknisi : '';
    this.pihak_ketiga = 'pihak_ketiga' in data ? data.pihak_ketiga : '';
    this.catatan = 'catatan' in data ? data.catatan : '';
    this.hasil_pemeliharaan = 'hasil_pemeliharaan' in data ? data.hasil_pemeliharaan : '';
    this.foto_1 = 'foto_1' in data ? data.foto_1 : undefined;
    this.foto_2 = 'foto_2' in data ? data.foto_2 : undefined;
    this.foto_3 = 'foto_3' in data ? data.foto_3 : undefined;
    this.upload_berkas_1 = 'upload_berkas_1' in data ? data.upload_berkas_1 : undefined;
    this.upload_berkas_2 = 'upload_berkas_2' in data ? data.upload_berkas_2 : undefined;
    this.upload_berkas_3 = 'upload_berkas_3' in data ? data.upload_berkas_3 : undefined;
  }
}

export class TanganiPemeliharaanResponse extends BaseResponse {
  response: string = ''
}

export default class TanganiPemeliharaanRequest extends BaseRequest<TanganiPemeliharaanResponse, TanganiPemeliharaanParam> {

  constructor(data: any) {
    super(HttpMethod.POST, 'svr_pemeliharaan.php', new TanganiPemeliharaanParam(data), TanganiPemeliharaanResponse);
  }

}