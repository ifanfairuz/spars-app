import React, { FC, useReducer } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions, NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'native-base';
import ListKeluhan from './ListKeluhan';
import TambahKeluhan from './TambahKeluhan';
import DetailKeluhan from './DetailKeluhan';
import TakeBarcode from './TakeBarcode';
import { KeluhanUserContextProvider } from '@context/keluhan/KeluhanUserContext';
import keluhanReducer from '@store/keluhan';
import Keluhan from '@store/models/Keluhan';
import { BarCodeReadEvent } from 'react-native-camera';
import RiwayatPemeliharaanUser from './RiwayatPemeliharaanUser';
import DetailPemeliharaanUser from './DetailPemeliharaanUser';
import pemeliharaanReducer from '@store/pemeliharaan';
import Pemeliharaan from '@store/models/Pemeliharaan';
import { PemeliharaanUserContextProvider } from '@context/pemeliharaan/PemeliharaanUserContext';

const UserNavigation = createNativeStackNavigator();

const screenOptions: Record<string, NativeStackNavigationOptions> = {
  ListKeluhan: {
    headerShown: false
  },
  TambahKeluhan: {
    headerShadowVisible: false,
    title: 'Tambah Keluhan',
    headerTitle: ({ children }) => <Text fontSize='16' bold letterSpacing='0.5'>{children}</Text>,
    headerTitleAlign: 'center',
    headerLargeTitleShadowVisible: false,
  },
  DetailKeluhan: {
    headerShown: false
  },
  TakeBarcode: {
    headerShown: false
  },
  RiwayatPemeliharaanUser: {
    headerShown: false
  },
  DetailPemeliharaanUser: {
    headerShadowVisible: false,
    title: 'Detail Pemeliharaan',
    headerTitle: ({ children }) => <Text fontSize='16' bold letterSpacing='0.5'>{children}</Text>,
    headerTitleAlign: 'center',
    headerLargeTitleShadowVisible: false,
  },
}

type ParamList = {
  ListKeluhan: undefined;
  RiwayatPemeliharaanUser: { data: Pemeliharaan };
  DetailPemeliharaanUser: { data: Pemeliharaan };
  TambahKeluhan?: { code?: string };
  DetailKeluhan: { data: Keluhan };
  TakeBarcode?: { onRead?: (e: BarCodeReadEvent, navigation: NativeStackNavigationProp<ParamList, 'TakeBarcode'>) => void };
};

export type UserScreenProps<T extends keyof ParamList> = NativeStackScreenProps<ParamList, T>;

const UserScreen: FC = () => {
  const [state_keluhan, dispatch_keluhan] = useReducer(keluhanReducer.actions, keluhanReducer.state);
  const [state_pemeliharaan, dispatch_pemeliharaan] = useReducer(pemeliharaanReducer.actions, pemeliharaanReducer.state);

  return (
    <KeluhanUserContextProvider state={state_keluhan} dispatch={dispatch_keluhan}>
    <PemeliharaanUserContextProvider state={state_pemeliharaan} dispatch={dispatch_pemeliharaan}>
      <UserNavigation.Navigator>
        <UserNavigation.Screen
          name='ListKeluhan'
          component={ListKeluhan}
          options={screenOptions.ListKeluhan} />
        <UserNavigation.Screen
          name='TambahKeluhan'
          component={TambahKeluhan}
          options={screenOptions.TambahKeluhan} />
        <UserNavigation.Screen
          name='DetailKeluhan'
          component={DetailKeluhan}
          options={screenOptions.DetailKeluhan} />
        <UserNavigation.Screen
          name='TakeBarcode'
          component={TakeBarcode}
          options={screenOptions.TakeBarcode} />
        <UserNavigation.Screen
          name='RiwayatPemeliharaanUser'
          component={RiwayatPemeliharaanUser}
          options={screenOptions.RiwayatPemeliharaanUser} />
        <UserNavigation.Screen
          name='DetailPemeliharaanUser'
          component={DetailPemeliharaanUser}
          options={screenOptions.DetailPemeliharaanUser} />
      </UserNavigation.Navigator>
    </PemeliharaanUserContextProvider>
    </KeluhanUserContextProvider>
  );
}

export default UserScreen;