import React, { FC, useReducer } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions, NativeStackScreenProps } from '@react-navigation/native-stack';
import DataTugas from './DataTugas';
import Report from './Report';
import DetailKeluhan from './DetailKeluhan';
import FormPemeliharaan from './FormPemeliharaan';
import { Text } from 'native-base';
import keluhanReducer from '@store/keluhan';
import { KeluhanTeknisiContextProvider } from '@context/keluhan/KeluhanTeknisiContext';
import Keluhan from '@store/models/Keluhan';

const UserNavigation = createNativeStackNavigator();

const screenOptions: Record<string, NativeStackNavigationOptions> = {
  DataTugas: {
    headerShown: false
  },
  Report: {
    headerShown: false
  },
  DetailKeluhan: {
    headerShown: false
  },
  FormPemeliharaan: {
    headerShadowVisible: false,
    title: 'Form Pemeliharaan',
    headerTitle: ({ children }) => <Text fontSize='16' fontWeight='700' letterSpacing='0.5'>{children}</Text>,
    headerTitleAlign: 'center',
    headerLargeTitleShadowVisible: false,
  },
}

type ParamList = {
  DataTugas: undefined;
  Report: undefined;
  DetailKeluhan: { data: Keluhan };
  FormPemeliharaan: undefined;
};

export type TeknisiScreenProps<T extends keyof ParamList> = NativeStackScreenProps<ParamList, T>;

const TeknisiScreen: FC = () => {
  const [state, dispatch] = useReducer(keluhanReducer.actions, keluhanReducer.state);

  return (
    <KeluhanTeknisiContextProvider state={state} dispatch={dispatch}>
      <UserNavigation.Navigator>
        <UserNavigation.Screen
          name='DataTugas'
          component={DataTugas}
          options={screenOptions.DataTugas} />
        <UserNavigation.Screen
          name='Report'
          component={Report}
          options={screenOptions.Report} />
        <UserNavigation.Screen
          name='DetailKeluhan'
          component={DetailKeluhan}
          options={screenOptions.DetailKeluhan} />
        <UserNavigation.Screen
          name='FormPemeliharaan'
          component={FormPemeliharaan}
          options={screenOptions.FormPemeliharaan} />
      </UserNavigation.Navigator>
    </KeluhanTeknisiContextProvider>
  );
}

export default TeknisiScreen;