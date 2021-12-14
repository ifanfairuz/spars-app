import React, { FC, useReducer } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import HomePage from './HomePage';
import PilihTeknisi from './PilihTeknisi';
import PilihAlat from './PilihAlat';
import TambahPenjadwalan from './TambahPenjadwalan';
import DetailKeluhan from './DetailKeluhan';
import DetailReportKeluhan from './DetailReportKeluhan';
import DetailReportPemeliharaan from './DetailReportPemeliharaan';
import TakeBarcode from './TakeBarcode';
import keluhanReducer from '@store/keluhan';
import pemeliharaanReducer from '@store/pemeliharaan';
import { KeluhanKatimContextProvider } from '@context/keluhan/KeluhanKatimContext';
import { PemeliharaanKatimContextProvider } from '@context/pemeliharaan/PemeliharaanKatimContext';
import Keluhan from '@store/models/Keluhan';
import { BarCodeReadEvent } from 'react-native-camera';
import DetailPemeliharaan from './DetailPemeliharaan';
import RiwayatPemeliharaanKatim from './RiwayatPemeliharaanKatim';
import { Text } from 'native-base';
import Pemeliharaan from '@store/models/Pemeliharaan';

const KatimNavigation = createNativeStackNavigator();

const screenOptions: Record<string, NativeStackNavigationOptions> = {
  HomePage: {
    headerShown: false
  },
  PilihTeknisi: {
    headerShown: false
  },
  DetailReportKeluhan: {
    headerShown: false
  },
  DetailReportPemeliharaan: {
    headerShown: false
  },
  PilihAlat: {
    headerShown: false
  },
  TambahPenjadwalan: {
    headerShown: false
  },
  DetailKeluhan: {
    headerShown: false
  },
  TakeBarcode: {
    headerShown: false
  },
  DataPemeliharaan: {
    headerShown: false
  },
  RiwayatPemeliharaanKatim: {
    headerShown: false
  },
  DetailPemeliharaan: {
    headerShadowVisible: false,
    title: 'Detail Pemeliharaan',
    headerTitle: ({ children }) => <Text fontSize='16' bold letterSpacing='0.5'>{children}</Text>,
    headerTitleAlign: 'center',
    headerLargeTitleShadowVisible: false,
  },
}

type ParamList = {
  HomePage: undefined;
  PilihTeknisi: { data: Keluhan };
  DetailReportKeluhan: undefined;
  DetailReportPemeliharaan: undefined;
  PilihAlat: undefined;
  TambahPenjadwalan: undefined;
  RiwayatPemeliharaanKatim: { data: Pemeliharaan };
  DetailPemeliharaan: { data: Pemeliharaan };
  DetailKeluhan: { data: Keluhan };
  TakeBarcode?: { onRead?: (e: BarCodeReadEvent, navigation: NativeStackNavigationProp<ParamList, 'TakeBarcode'>) => void };
};

export type KatimScreenProps<T extends keyof ParamList> = NativeStackScreenProps<ParamList, T>;

const KatimScreen: FC = () => {
  const [state_keluhan, dispatch_keluhan] = useReducer(keluhanReducer.actions, keluhanReducer.state);
  const [state_pemeliharaan, dispatch_pemeliharaan] = useReducer(pemeliharaanReducer.actions, pemeliharaanReducer.state);

  return (
    <PemeliharaanKatimContextProvider state={state_pemeliharaan} dispatch={dispatch_pemeliharaan}>
      <KeluhanKatimContextProvider state={state_keluhan} dispatch={dispatch_keluhan}>
        <KatimNavigation.Navigator>
          <KatimNavigation.Screen
            name='HomePage'
            component={HomePage}
            options={screenOptions.HomePage} />
          <KatimNavigation.Screen
            name='PilihTeknisi'
            component={PilihTeknisi}
            options={screenOptions.PilihTeknisi} />
          <KatimNavigation.Screen
            name='DetailPemeliharaan'
            component={DetailPemeliharaan}
            options={screenOptions.DetailPemeliharaan} />
          <KatimNavigation.Screen
            name='RiwayatPemeliharaanKatim'
            component={RiwayatPemeliharaanKatim}
            options={screenOptions.RiwayatPemeliharaanKatim} />
          <KatimNavigation.Screen
            name='DetailReportKeluhan'
            component={DetailReportKeluhan}
            options={screenOptions.DetailReportKeluhan} />
          <KatimNavigation.Screen
            name='DetailReportPemeliharaan'
            component={DetailReportPemeliharaan}
            options={screenOptions.DetailReportPemeliharaan} />
          <KatimNavigation.Screen
            name='PilihAlat'
            component={PilihAlat}
            options={screenOptions.PilihAlat} />
          <KatimNavigation.Screen
            name='TambahPenjadwalan'
            component={TambahPenjadwalan}
            options={screenOptions.TambahPenjadwalan} />
          <KatimNavigation.Screen
            name='DetailKeluhan'
            component={DetailKeluhan}
            options={screenOptions.DetailKeluhan} />
          <KatimNavigation.Screen
            name='TakeBarcode'
            component={TakeBarcode}
            options={screenOptions.TakeBarcode} />
        </KatimNavigation.Navigator>
      </KeluhanKatimContextProvider>
    </PemeliharaanKatimContextProvider>
  );
}

export default KatimScreen;