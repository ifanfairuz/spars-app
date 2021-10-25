import { BaseParamsWithToken, BaseRequest, BaseResponse } from "@support/http";
import { HttpMethod } from "@support/http/contract/Request";
import moment from "moment";

export class AddKeluhanParam extends BaseParamsWithToken {
  act: string = 'addKeluhan'
  id_alat: string
  deskripsi_keluhan: string = ''
  tgl_keluhan: string
  jam: string
  insiden?: string
  foto_1?: string
  foto_2?: string
  foto_3?: string

  constructor(id_alat: string, insiden?: string, deskripsi_keluhan?: string, photos: string[] = []) {
    super();
    const date = moment();
    this.id_alat = id_alat;
    this.insiden = insiden || '';
    this.deskripsi_keluhan = deskripsi_keluhan || '';
    this.foto_1 = photos.length > 0 ? photos[0] : '';
    this.foto_2 = photos.length > 1 ? photos[1] : '';
    this.foto_3 = photos.length > 2 ? photos[2] : '';
    this.tgl_keluhan = date.format('YYYY-MM-DD');
    this.jam = date.format('HH:mm:ss');
  }
}

export class AddKeluhanResponse extends BaseResponse {
  respon: string = ''
  response: string = ''
}

export default class AddKeluhanRequest extends BaseRequest<AddKeluhanResponse, AddKeluhanParam> {

  constructor(id_alat: string, insiden?: string, deskripsi_keluhan?: string, photos: string[] = []) {
    super(HttpMethod.POST, 'svr_keluhan.php', new AddKeluhanParam(id_alat, insiden, deskripsi_keluhan, photos), AddKeluhanResponse);
  }

}