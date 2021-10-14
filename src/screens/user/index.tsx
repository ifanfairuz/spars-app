import React, { FC } from 'react';
import { createNativeStackNavigator, NativeStackNavigationOptions } from '@react-navigation/native-stack';
import ListKeluhan from './ListKeluhan';

const UserNavigation = createNativeStackNavigator();

const screenOptions: Record<string, NativeStackNavigationOptions> = {
  ListKeluhan: {
    headerShown: false
  }
}

const UserScreen: FC = () => {
  return (
    <UserNavigation.Navigator>
      <UserNavigation.Screen
        name='ListKeluhan'
        component={ListKeluhan}
        options={screenOptions.ListKeluhan} />
    </UserNavigation.Navigator>
  );
}

export default UserScreen;