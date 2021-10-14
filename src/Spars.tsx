import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { NativeBaseProvider } from 'native-base';
import { theme, config } from '@config/native-base';
import MainScreen from '@screens';

const Spars: React.FC = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme} config={config}>
        <MainScreen />
      </NativeBaseProvider>
    </NavigationContainer>
  );
}

export default Spars;
