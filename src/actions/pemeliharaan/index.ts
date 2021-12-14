import http from "@support/http"
import axios, { CancelTokenSource } from "axios";
import AddPemeliharaanRequest from "./AddPemeliharaanRequest";
import GetPemeliharaanRequest from "./GetPemeliharaanRequest";
import TanganiPemeliharaanRequest from "./TanganiPemeliharaanRequest";

let cancelToken: CancelTokenSource|undefined = undefined;

export async function getPemeliharaan(date: string) {
  if (cancelToken) cancelToken.cancel();
  cancelToken = axios.CancelToken.source();
  const request = new GetPemeliharaanRequest(date, cancelToken.token);
  const response = await http.execute(request).catch((err) => undefined)
  .finally(() => {
    cancelToken = undefined;
  });
  return response ? response.data : [];
}

export async function tambahPemeliharaan(data: any) {
  const request = new AddPemeliharaanRequest(data);
  const response = await http.execute(request).catch((err) => undefined);
  return (response && response.response == 'success');
}

export async function tanganiPemeliharaan(data: any) {
  const request = new TanganiPemeliharaanRequest(data);
  const response = await http.execute(request).catch((err) => undefined);
  return (response && response.response == 'success');
}

export default {
  tambahPemeliharaan,
  getPemeliharaan,
  tanganiPemeliharaan
}