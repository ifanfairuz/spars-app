import { createContext } from "react";
import { login, logout, getUser } from "@actions/auth";

const AuthContext = createContext({
  login,
  logout,
  getUser
});

export default AuthContext;