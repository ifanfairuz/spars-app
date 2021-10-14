import React, { FC } from 'react';
import { IImageProps, Image } from 'native-base';

const GlassBg: FC<IImageProps> = (props) => {
  const glass = require('@assets/images/login-bg.png')
  return (
    <Image
      {...props}
      position='absolute'
      width='100%'
      source={glass}
      alt='login-bg' />
  );
}

export default GlassBg;