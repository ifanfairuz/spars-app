import React, { FC } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions, NativeStackScreenProps } from '@react-navigation/native-stack';
import HomePage from './HomePage';
import PilihTeknisi from './PilihTeknisi';
import DetailReport from './DetailReport';
import PilihAlat from './PilihAlat';
import TambahPenjadwalan from './TambahPenjadwalan';

const UserNavigation = createNativeStackNavigator();

const screenOptions: Record<string, NativeStackNavigationOptions> = {
  HomePage: {
    headerShown: false
  },
  PilihTeknisi: {
    headerShown: false
  },
  DetailReport: {
    headerShown: false
  },
  PilihAlat: {
    headerShown: false
  },
  TambahPenjadwalan: {
    headerShown: false
  }
}

type ParamList = {
  HomePage: undefined;
  PilihTeknisi: undefined;
  DetailReport: undefined;
  PilihAlat: undefined;
  TambahPenjadwalan: undefined;
};

export type KatimScreenProps<T extends keyof ParamList> = NativeStackScreenProps<ParamList, T>;

const KatimScreen: FC = () => {
  return (
    <UserNavigation.Navigator>
      <UserNavigation.Screen
        name='HomePage'
        component={HomePage}
        options={screenOptions.HomePage} />
      <UserNavigation.Screen
        name='PilihTeknisi'
        component={PilihTeknisi}
        options={screenOptions.PilihTeknisi} />
      <UserNavigation.Screen
        name='DetailReport'
        component={DetailReport}
        options={screenOptions.DetailReport} />
      <UserNavigation.Screen
        name='PilihAlat'
        component={PilihAlat}
        options={screenOptions.PilihAlat} />
      <UserNavigation.Screen
        name='TambahPenjadwalan'
        component={TambahPenjadwalan}
        options={screenOptions.TambahPenjadwalan} />
    </UserNavigation.Navigator>
  );
}

export default KatimScreen;