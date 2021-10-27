import React, { createContext, FC, useEffect, useMemo } from "react";
import { ContextProviderProps } from "@context/_type";
import { login, logout, getUser } from "@actions/auth";
import { AuthAction, State, state } from '@store/auth';
import SplashScreen from "@screens/SplashScreen";
import http from "@support/http";

const AuthContext = createContext({
  state,
  login,
  logout,
  getUser
});

export const AuthContextProvider: FC<ContextProviderProps<State, AuthAction>> = ({ dispatch, state, children }) => {
  const context = useMemo(() => {
    const con = {
      state,
      login: (username: string, password: string) => {
        return login(username, password)
        .then(user => {
          dispatch({ type: 'SET_LOADING', payload: true });
          user ? dispatch({ type:'SET_USER', payload: user }) : dispatch({ type: 'REMOVE_USER' });
          dispatch({ type:'SET_MESSAGE', payload: '' });
          return user;
        })
        .catch((e: Error) => {
          dispatch({ type: 'REMOVE_USER' });
          dispatch({ type:'SET_MESSAGE', payload: e.message });
          return undefined;
        })
        .finally(() => dispatch({ type: 'SET_LOADING', payload: false }));
      },
      logout: () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        return logout()
        .then(success => {
          if (success) dispatch({ type: 'REMOVE_USER' });
          return success;
        })
        .finally(() => dispatch({ type: 'SET_LOADING', payload: false }));
      },
      getUser: async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        const user = state.user ?? await getUser().then(user => {
          dispatch({ type: 'SET_USER', payload: user });
          return user;
        });
        dispatch({ type: 'SET_LOADING', payload: false });
        return user;
      }
    }
    http.setLogoutHandler(con.logout);
    return con;
  }, [state]);

  useEffect(() => {
    context.getUser();
    // context.logout();
  }, []);

  const render = () => {
    if (state.loading) {
      return <SplashScreen />;
    }

    return children;
  }

  return (
    <AuthContext.Provider value={context}>
      { render() }
    </AuthContext.Provider>
  );
}

export default AuthContext;