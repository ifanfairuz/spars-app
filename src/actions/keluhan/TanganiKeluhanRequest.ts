import { BaseParamsWithToken, BaseRequest, BaseResponse } from "@support/http";
import { HttpMethod } from "@support/http/contract/Request";

export class TanganiKeluhanParam extends BaseParamsWithToken {
  act: string = 'penangananKeluhan'
  id_keluhan: string
  catatan_teknisi: string = ''
  hasil_penanganan: string = ''
  foto_1?: string
  foto_2?: string
  foto_3?: string

  constructor(id_keluhan: string, hasil_penanganan: string, catatan_teknisi: string = '', photos: string[] = []) {
    super();
    this.id_keluhan = id_keluhan;
    this.hasil_penanganan = hasil_penanganan;
    this.catatan_teknisi = catatan_teknisi;
    this.foto_1 = photos.length > 0 ? photos[0] : '';
    this.foto_2 = photos.length > 1 ? photos[1] : '';
    this.foto_3 = photos.length > 2 ? photos[2] : '';
  }
}

export class TanganiKeluhanResponse extends BaseResponse {
  response: string = ''
}

export default class TanganiKeluhanRequest extends BaseRequest<TanganiKeluhanResponse, TanganiKeluhanParam> {

  constructor(id_keluhan: string, hasil_penanganan: string, catatan_teknisi: string = '', photos: string[] = []) {
    super(HttpMethod.POST, 'svr_keluhan.php', new TanganiKeluhanParam(id_keluhan, hasil_penanganan, catatan_teknisi, photos), TanganiKeluhanResponse);
  }

}