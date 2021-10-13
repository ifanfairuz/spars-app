import React, { FC } from 'react';
import { Box, Button, Center, HStack, Image, Pressable, Text, VStack } from 'native-base';
import { Logo, Input } from '@components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Login: FC = () => {
  const glass = require('@assets/images/login-bg.png')
  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex:1 }}>
      <Box flex={1} bg='spars.green2' justifyContent='flex-end'>
        <Center height='40%' width='100%' position='absolute' top={0}>
          <Image
            position='absolute'
            width='100%'
            source={glass}
            alt='login-bg' />
          <Logo solid={true} />
        </Center>
        <VStack
          bg='white'
          space={5}
          borderTopRadius={24}
          px={8} py={10}>
          <Input placeholder='johndoe@mail.com' label='Username / Email' />
          <Input placeholder='••••••••' label='Password' inputProps={{ type: 'password' }} />
          <Pressable>
            <Text color='spars.orange'>Lupa Password ?</Text>
          </Pressable>
          <Button
            py={5}
            size='lg'
            bg='spars.orange'
            shadow='9.orange'
            _text={{ color: 'white' }}
            _pressed={{ bg: 'spars.orange', opacity: 0.8 }}>
            Login
          </Button>
          <HStack justifyContent='center'>
            <Text fontSize='md'>Belum punya akun? </Text>
            <Pressable>
              <Text fontSize='md' color='spars.green'>Register</Text>
            </Pressable>
          </HStack>
        </VStack>
      </Box>
    </KeyboardAwareScrollView>
  );
}

export default Login;