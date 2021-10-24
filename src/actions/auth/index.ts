import { delete_session, get_session, store_session } from "@store/session";
import http from "@support/http";
import LoginRequest from "./LoginRequest";

export async function login(username: string, password: string) {
  const request = new LoginRequest(username, password);
  const response = await http.execute(request).catch<undefined>(() => undefined);
  if (response) {
    await store_session({ user: response.user });
    return response.user;
  }

  return undefined;
}

export async function logout() {
  await delete_session();
  return true;
}

export async function getUser() {
  const session = await get_session('user');
  return session;
}

export default {
  login,
  logout,
  getUser
}