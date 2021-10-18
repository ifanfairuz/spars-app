import { delete_session, get_session, store_session } from "@store/session";

export async function login(username: string, password: string) {
  const data = {
    user: {
      username,
      password
    }
  };
  await store_session(data);
  return data.user;
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