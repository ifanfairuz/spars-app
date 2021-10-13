import React from 'react';
import { NativeBaseProvider } from 'native-base';
import theme from '@config/theme';
import { Login } from '@screens';

const Spars: React.FC = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <Login />
    </NativeBaseProvider>
  );
}

export default Spars;
