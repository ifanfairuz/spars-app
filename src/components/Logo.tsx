import React, { FC } from 'react';
import { Center, IImageProps, Image } from 'native-base';

interface LogoPropsSelf {
  solid?: boolean
}
export type LogoProps = IImageProps & React.RefAttributes<unknown> & LogoPropsSelf;

const Logo: FC<LogoProps> = (props) => {
  const logo = require('@assets/images/logo.png');
  return (
    <Center
      bg={props.solid ? 'white' : 'transparent'}
      width={props.solid ? '32' : undefined}
      height={props.solid ? '32' : undefined}
      borderRadius={props.solid ? '100' : 0}>
      <Image
        {...props}
        source={logo}
        alt='logo_spars'
        resizeMode='contain'
        height={70} />
    </Center>
  )
}

export default Logo;