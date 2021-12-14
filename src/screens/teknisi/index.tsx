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
import RiwayatPemeliharaan from './RiwayatPemeliharaan';
import DetailPemeliharaan from './DetailPemeliharaan';
import Pemeliharaan from '@store/models/Pemeliharaan';
import pemeliharaanReducer from '@store/pemeliharaan';
import { PemeliharaanTeknisiContextProvider } from '@context/pemeliharaan/PemeliharaanTeknisiContext';

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
  DetailPemeliharaan: {
    headerShadowVisible: false,
    title: 'Detail Pemeliharaan',
    headerTitle: ({ children }) => <Text fontSize='16' bold letterSpacing='0.5'>{children}</Text>,
    headerTitleAlign: 'center',
    headerLargeTitleShadowVisible: false,
  },
  RiwayatPemeliharaan: {
    headerShown: false
  },
  FormPemeliharaan: {
    headerShadowVisible: false,
    title: 'Form Pemeliharaan',
    headerTitle: ({ children }) => <Text fontSize='16' bold letterSpacing='0.5'>{children}</Text>,
    headerTitleAlign: 'center',
    headerLargeTitleShadowVisible: false,
  },
}

type ParamList = {
  DataTugas: undefined;
  Report: undefined;
  DetailKeluhan: { data: Keluhan };
  RiwayatPemeliharaan: { data: Pemeliharaan };
  FormPemeliharaan: { data: Pemeliharaan };
  DetailPemeliharaan: { data: Pemeliharaan };
};

export type TeknisiScreenProps<T extends keyof ParamList> = NativeStackScreenProps<ParamList, T>;

const TeknisiScreen: FC = () => {
  const [state_keluhan, dispatch_keluhan] = useReducer(keluhanReducer.actions, keluhanReducer.state);
  const [state_pemeliharaan, dispatch_pemeliharaan] = useReducer(pemeliharaanReducer.actions, pemeliharaanReducer.state);

  return (
    <KeluhanTeknisiContextProvider state={state_keluhan} dispatch={dispatch_keluhan}>
    <PemeliharaanTeknisiContextProvider state={state_pemeliharaan} dispatch={dispatch_pemeliharaan}>
      <UserNavigation.Navigator>
        <UserNavigation.Screen
          name='DataTugas'
          component={DataTugas}
          options={screenOptions.DataTugas} />
        <UserNavigation.Screen
          name='RiwayatPemeliharaan'
          component={RiwayatPemeliharaan}
          options={screenOptions.RiwayatPemeliharaan} />
        <UserNavigation.Screen
          name='Report'
          component={Report}
          options={screenOptions.Report} />
        <UserNavigation.Screen
          name='DetailPemeliharaan'
          component={DetailPemeliharaan}
          options={screenOptions.DetailPemeliharaan} />
        <UserNavigation.Screen
          name='DetailKeluhan'
          component={DetailKeluhan}
          options={screenOptions.DetailKeluhan} />
        <UserNavigation.Screen
          name='FormPemeliharaan'
          component={FormPemeliharaan}
          options={screenOptions.FormPemeliharaan} />
      </UserNavigation.Navigator>
    </PemeliharaanTeknisiContextProvider>
    </KeluhanTeknisiContextProvider>
  );
}

export default TeknisiScreen;