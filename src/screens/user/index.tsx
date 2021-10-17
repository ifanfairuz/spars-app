import React, { FC } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text } from 'native-base';
import ListKeluhan from './ListKeluhan';
import TambahKeluhan from './TambahKeluhan';
import DetailKeluhan from './DetailKeluhan';
import TakePhoto from './TakePhoto';
import TakeBarcode from './TakeBarcode';

const UserNavigation = createNativeStackNavigator();

const screenOptions: Record<string, NativeStackNavigationOptions> = {
  ListKeluhan: {
    headerShown: false
  },
  TambahKeluhan: {
    headerShadowVisible: false,
    title: 'Tambah Keluhan',
    headerTitle: ({ children }) => <Text fontSize='16' fontWeight='700' letterSpacing='0.5'>{children}</Text>,
    headerTitleAlign: 'center',
    headerLargeTitleShadowVisible: false,
  },
  DetailKeluhan: {
    headerShown: false
  },
  TakePhoto: {
    headerShown: false
  },
  TakeBarcode: {
    headerShown: false
  }
}

type ParamList = {
  ListKeluhan: undefined;
  TambahKeluhan: undefined;
  DetailKeluhan: undefined;
  TakePhoto: undefined;
  TakeBarcode: undefined;
};

export type UserScreenProps<T extends keyof ParamList> = NativeStackScreenProps<ParamList, T>;

const UserScreen: FC = () => {
  return (
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
        name='TakePhoto'
        component={TakePhoto}
        options={screenOptions.TakePhoto} />
      <UserNavigation.Screen
        name='TakeBarcode'
        component={TakeBarcode}
        options={screenOptions.TakeBarcode} />
    </UserNavigation.Navigator>
  );
}

export default UserScreen;