import http from "@support/http";
import DashboardKatimRequest, { DashboardKatimResponse } from "./DashboardKatimRequest";

export async function getKatimDashboard(date: string) {
  const request = new DashboardKatimRequest(date);
  const response = await http.execute(request).catch(() => new DashboardKatimResponse());
  return response;
}