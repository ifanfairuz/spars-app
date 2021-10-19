import React, { FC } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions, NativeStackScreenProps } from '@react-navigation/native-stack';
import DataTugas from './DataTugas';
import Report from './Report';
import DetailKeluhan from './DetailKeluhan';
import FormPemeliharaan from './FormPemeliharaan';
import { Text } from 'native-base';

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
  DetailKeluhan: undefined;
  FormPemeliharaan: undefined;
};

export type TeknisiScreenProps<T extends keyof ParamList> = NativeStackScreenProps<ParamList, T>;

const TeknisiScreen: FC = () => {
  return (
    <UserNavigation.Navigator initialRouteName='FormPemeliharaan'>
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
  );
}

export default TeknisiScreen;