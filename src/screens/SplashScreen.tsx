import React, { FC } from 'react';
import { Box, Center, Text, Image } from 'native-base';
import { Logo } from '@components';

const SplashScreen: FC = () => {
  const loading = require('@assets/images/splash-bg.png');
  return (
    <Box flex={1}>
      <Center flex={1} pb={32}>
        <Logo />
      </Center>
      <Box
        position='absolute'
        width='100%'
        alignItems='center'
        justifyContent='flex-end'
        bottom={0}
        height='30%'
        minHeight={200}>
        <Image
          source={loading}
          position='absolute'
          width='100%'
          height='100%'
          resizeMode='stretch'
          alt='bg-splash' />
        <Text
          color='white'
          marginBottom={12}
          fontSize='md'>
          POWERED BY GREATCODE
        </Text>
      </Box>
    </Box>
  );
}

export default SplashScreen;