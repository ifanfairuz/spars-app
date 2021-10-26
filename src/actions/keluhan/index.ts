import http from "@support/http"
import axios, { Canceler } from "axios";
import GetKeluhanRequest from "./GetKeluhanRequest"
import GetAlatRequest, { GetAlatResponse } from "@actions/GetAlatRequest";
import AddKeluhanRequest from "./AddKeluhanRequest";
import GetTeknisiRequest, { GetTeknisiResponse } from "@actions/GetTeknisiRequest";
import TanganiKeluhanRequest from "./TanganiKeluhanRequest";
import ApproveKeluhanRequest from "./ApproveKeluhanRequest";

let cancelTokenSearch: Canceler|undefined;
let cancelTokenAlatSearch: Canceler|undefined;

export async function getKeluhan(filter: string = '', cancelable: boolean = true, only_me: boolean = true) {
  if (cancelable && cancelTokenSearch) {
    cancelTokenSearch();
    cancelTokenSearch = undefined;
  }
  const request = new GetKeluhanRequest(filter, only_me, cancelable ? new axios.CancelToken(c => cancelTokenSearch = c) : undefined);
  const response = await http.execute(request).catch(() => undefined);
  return response ? response.datas : [];
}

export async function getAlat(key?: string, page: number = 1, cancelable: boolean = false) {
  if (cancelable && cancelTokenAlatSearch) {
    cancelTokenAlatSearch();
    cancelTokenAlatSearch = undefined;
  }
  const request = new GetAlatRequest(key, page, cancelable ? new axios.CancelToken(c => cancelTokenAlatSearch = c) : undefined);
  const response = await http.execute(request).catch(() => new GetAlatResponse());
  return response;
}

export async function getTeknisi() {
  const request = new GetTeknisiRequest();
  const response = await http.execute(request).catch(() => new GetTeknisiResponse());
  return response.data;
}

export async function tambahKeluhan(id_alat: string, no_seri: string, insiden?: string, deskripsi_keluhan?: string, photos: string[] = []) {
  const request = new AddKeluhanRequest(id_alat, no_seri, insiden, deskripsi_keluhan, photos);
  const response = await http.execute(request).catch(() => undefined);
  return (response && response.response == 'success');
}

export async function approveKeluhan(id_keluhan: string, id_teknisi: string, memo: string = '') {
  const request = new ApproveKeluhanRequest(id_keluhan, id_teknisi, memo);
  const response = await http.execute(request).catch(() => undefined);
  return (response && response.response == 'success');
}

export async function tanganiKeluhan(id_keluhan: string, hasil_penanganan: string, catatan_teknisi: string = '', photos: string[] = []) {
  const request = new TanganiKeluhanRequest(id_keluhan, hasil_penanganan, catatan_teknisi, photos);
  const response = await http.execute(request).catch(() => undefined);
  return (response && response.response == 'success');
}

export default {
  getKeluhan,
  tambahKeluhan,
  approveKeluhan,
  tanganiKeluhan,
}