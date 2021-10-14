import React, { FC, useContext, useState } from 'react';
import { Box, Button, Center, HStack, Pressable, Text, VStack } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Logo, Input, GlassBg } from '@components';
import AuthContext from '@context/AuthContext';

const Login: FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const authContext = useContext(AuthContext);
  const login = () => authContext.login(username, password);

  return (
    <KeyboardAwareScrollView contentContainerStyle={{ flex:1 }}>
      <Box flex={1} bg='spars.green2' justifyContent='flex-end'>
        <Center height='40%' width='100%' position='absolute' top={0}>
          <GlassBg />
          <Logo solid={true} />
        </Center>
        <VStack
          bg='white'
          space={5}
          borderTopRadius={24}
          px={8} py={10}>
          <Input placeholder='johndoe@mail.com' label='Username / Email' value={username} onChangeText={setUsername} />
          <Input placeholder='••••••••' label='Password' inputProps={{ type: 'password' }} value={password} onChangeText={setPassword} />
          <Pressable>
            <Text color='spars.orange'>Lupa Password ?</Text>
          </Pressable>
          <Button
            py={5}
            size='lg'
            bg='spars.orange'
            shadow='9.orange'
            _text={{ color: 'white' }}
            _pressed={{ bg: 'spars.orange', opacity: 0.8 }}
            onPress={login}>
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