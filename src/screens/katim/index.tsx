import React, { FC, useReducer } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions, NativeStackScreenProps } from '@react-navigation/native-stack';
import HomePage from './HomePage';
import PilihTeknisi from './PilihTeknisi';
import DetailReportKeluhan from './DetailReportKeluhan';
import PilihAlat from './PilihAlat';
import TambahPenjadwalan from './TambahPenjadwalan';
import DetailKeluhan from './DetailKeluhan';
import keluhanReducer from '@store/keluhan';
import { KeluhanKatimContextProvider } from '@context/keluhan/KeluhanKatimContext';
import Keluhan from '@store/models/Keluhan';

const UserNavigation = createNativeStackNavigator();

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
  PilihAlat: {
    headerShown: false
  },
  TambahPenjadwalan: {
    headerShown: false
  },
  DetailKeluhan: {
    headerShown: false
  }
}

type ParamList = {
  HomePage: undefined;
  PilihTeknisi: { data: Keluhan };
  DetailReportKeluhan: undefined;
  PilihAlat: undefined;
  TambahPenjadwalan: undefined;
  DetailKeluhan: { data: Keluhan };
};

export type KatimScreenProps<T extends keyof ParamList> = NativeStackScreenProps<ParamList, T>;

const KatimScreen: FC = () => {
  const [state, dispatch] = useReducer(keluhanReducer.actions, keluhanReducer.state);

  return (
    <KeluhanKatimContextProvider state={state} dispatch={dispatch}>
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
          name='DetailReportKeluhan'
          component={DetailReportKeluhan}
          options={screenOptions.DetailReportKeluhan} />
        <UserNavigation.Screen
          name='PilihAlat'
          component={PilihAlat}
          options={screenOptions.PilihAlat} />
        <UserNavigation.Screen
          name='TambahPenjadwalan'
          component={TambahPenjadwalan}
          options={screenOptions.TambahPenjadwalan} />
        <UserNavigation.Screen
          name='DetailKeluhan'
          component={DetailKeluhan}
          options={screenOptions.DetailKeluhan} />
      </UserNavigation.Navigator>
    </KeluhanKatimContextProvider>
  );
}

export default KatimScreen;