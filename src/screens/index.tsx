import React, { FC, useEffect, useMemo, useReducer } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import AuthContext from '@context/AuthContext';
import authActions from '@actions/auth';
import authReducer from '@store/auth';

import Login from "./Login";
import SplashScreen from "./SplashScreen";
import UserScreen from "./user";

const MainNavigation = createNativeStackNavigator();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false
}

const MainScreen: FC = () => {
  const [state, dispatch] = useReducer(authReducer.actions, authReducer.state);

  const authContext = useMemo(() => ({
    login: (username: string, password: string) => {
      dispatch({ type: 'SET_LOADING', payload: true });
      return authActions.login(username, password)
      .then(user => {
        user ? dispatch({ type:'SET_USER', payload: user }) : dispatch({ type: 'REMOVE_USER' });
        return user;
      })
      .finally(() => dispatch({ type: 'SET_LOADING', payload: false }));
    },
    logout: () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      return authActions.logout()
      .then(success => {
        if (success) dispatch({ type: 'REMOVE_USER' });
        return success;
      })
      .finally(() => dispatch({ type: 'SET_LOADING', payload: false }));
    },
    getUser: async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      const user = state.user ?? await authActions.getUser().then(user => {
        dispatch({ type: 'SET_USER', payload: user });
        return user;
      });
      dispatch({ type: 'SET_LOADING', payload: false });
      return user;
    }
  }), []);

  useEffect(() => {
    authContext.getUser();
  }, []);

  if (state.loading) {
    return <SplashScreen />
  }

  const renderScreen = () => {
    if (state.user) {
      switch (state.user.username) {
        case 'user':
          return <MainNavigation.Screen name='Main' component={UserScreen} />;
        case 'teknisi':
          return <MainNavigation.Screen name='Main' component={UserScreen} />;
        case 'katim':
          return <MainNavigation.Screen name='Main' component={UserScreen} />;
      }
    }
    return <MainNavigation.Screen name='Login' component={Login} />
  }

  return (
    <AuthContext.Provider value={authContext}>
      <MainNavigation.Navigator screenOptions={screenOptions}>
        { renderScreen() }
      </MainNavigation.Navigator>
    </AuthContext.Provider>
  );
}

export default MainScreen;