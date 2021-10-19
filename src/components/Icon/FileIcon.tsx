import React, { FC } from 'react';
import { Icon, IIconProps } from 'native-base';
import { Path, G } from "react-native-svg"

const FileIcon: FC<IIconProps> = (props) => {
  return (
    <Icon viewBox="0 0 24 24" {...props}>
      <G fill="none">
        <Path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M16 13H8" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M16 17H8" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M10 9H9H8" stroke="#9E9E9E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </G>
    </Icon>
  )
}

export default FileIcon;