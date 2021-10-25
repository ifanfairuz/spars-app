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
  TakeBarcode: {
    headerShown: false
  }
}

type ParamList = {
  ListKeluhan: undefined;
  TambahKeluhan?: { code?: string };
  DetailKeluhan: { data: Keluhan };
  TakeBarcode?: { onRead?: (e: BarCodeReadEvent, navigation: NativeStackNavigationProp<ParamList, 'TakeBarcode'>) => void };
};

export type UserScreenProps<T extends keyof ParamList> = NativeStackScreenProps<ParamList, T>;

const UserScreen: FC = () => {
  const [state, dispatch] = useReducer(keluhanReducer.actions, keluhanReducer.state);

  return (
    <KeluhanUserContextProvider state={state} dispatch={dispatch}>
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
      </UserNavigation.Navigator>
    </KeluhanUserContextProvider>
  );
}

export default UserScreen;