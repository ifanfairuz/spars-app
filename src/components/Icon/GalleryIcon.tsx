import React, { FC } from 'react';
import { Icon, IIconProps } from 'native-base';
import { Path, G } from "react-native-svg"

const GalleryIcon: FC<IIconProps> = (props) => {
  return (
    <Icon viewBox="0 0 36 36" {...props}>
      <G fill="none">
        <Path d="M32.12 10H3.88A1.88 1.88 0 0 0 2 11.88v18.24A1.88 1.88 0 0 0 3.88 32h28.24A1.88 1.88 0 0 0 34 30.12V11.88A1.88 1.88 0 0 0 32.12 10zM32 30H4V12h28z" fill="currentColor" />
        <Path d="M8.56 19.45a3 3 0 1 0-3-3a3 3 0 0 0 3 3zm0-4.6A1.6 1.6 0 1 1 7 16.45a1.6 1.6 0 0 1 1.56-1.6z" fill="currentColor" />
        <Path d="M7.9 28l6-6l3.18 3.18L14.26 28h2l7.46-7.46L30 26.77v-2L24.2 19a.71.71 0 0 0-1 0l-5.16 5.16l-3.67-3.66a.71.71 0 0 0-1 0L5.92 28z" fill="currentColor" />
        <Path d="M30.14 3a1 1 0 0 0-1-1h-22a1 1 0 0 0-1 1v1h24z" fill="currentColor" />
        <Path d="M32.12 7a1 1 0 0 0-1-1h-26a1 1 0 0 0-1 1v1h28z" fill="currentColor" />
      </G>
    </Icon>
  )
}

export default GalleryIcon;