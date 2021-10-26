import http from "@support/http";
import axios, { Canceler } from "axios";
import DashboardKatimRequest, { DashboardKatimResponse } from "./DashboardKatimRequest";

let cancelTokenDashboardKatim: Canceler|undefined;

export async function getKatimDashboard(date: string) {
  if (cancelTokenDashboardKatim) {
    cancelTokenDashboardKatim();
    cancelTokenDashboardKatim = undefined;
  }
  const request = new DashboardKatimRequest(date, new axios.CancelToken(c => cancelTokenDashboardKatim = c));
  const response = await http.execute(request).catch(() => new DashboardKatimResponse());
  return response;
}