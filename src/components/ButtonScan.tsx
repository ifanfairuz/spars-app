import React, { FC } from 'react';
import { Button, IButtonProps, IImageProps, Image } from 'native-base';

export interface ButtonScanProps extends IButtonProps {
  imageProps?: IImageProps
}

const ButtonScan: FC<ButtonScanProps> = ({ imageProps, ...props }) => {
  return (
    <Button
    borderRadius='100'
    p='4'
    bg='spars.orange'
    shadow='10.orange'
    _pressed={{ bg: 'spars.orange' }}
    {...props}>
      <Image size='2xs' {...imageProps} source={require('@assets/images/icon_scan.png')} />
    </Button>
  )
}

export default ButtonScan;