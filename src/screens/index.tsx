import React, { FC, useReducer } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { AuthContextProvider } from '@context/AuthContext';
import authReducer from '@store/auth';

import Login from "./Login";
import UserScreen from "./user";
import KatimScreen from './katim';
import TeknisiScreen from './teknisi';

const MainNavigation = createNativeStackNavigator();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: false
}

const MainScreen: FC = () => {
  const [state, dispatch] = useReducer(authReducer.actions, authReducer.state);

  const renderScreen = () => {
    if (state.user?.id_user) {
      switch (state.user.level_name) {
        case 'User':
          return <MainNavigation.Screen name='Main' component={UserScreen} />;
        case 'Teknisi':
          return <MainNavigation.Screen name='Main' component={TeknisiScreen} />;
        case 'Katim':
          return <MainNavigation.Screen name='Main' component={KatimScreen} />;
      }
    }
    return <MainNavigation.Screen name='Login' component={Login} />
  }

  return (
    <AuthContextProvider state={state} dispatch={dispatch}>
      <MainNavigation.Navigator screenOptions={screenOptions}>
        { renderScreen() }
      </MainNavigation.Navigator>
    </AuthContextProvider>
  );
}

export default MainScreen;