import http from "@support/http"
import axios, { Canceler } from "axios";
import GetAlatRequest, { GetAlatResponse } from "@actions/GetAlatRequest";

let cancelTokenAlatSearch: Canceler|undefined;

export async function getAlat(key?: string, page: number = 1, cancelable: boolean = false) {
  if (cancelable && cancelTokenAlatSearch) {
    cancelTokenAlatSearch();
    cancelTokenAlatSearch = undefined;
  }
  const request = new GetAlatRequest(key, page, cancelable ? new axios.CancelToken(c => cancelTokenAlatSearch = c) : undefined);
  const response = await http.execute(request).catch(() => new GetAlatResponse());
  return response;
}