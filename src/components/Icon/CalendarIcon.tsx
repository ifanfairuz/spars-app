import React, { FC } from 'react';
import { Icon, IIconProps } from 'native-base';
import { Path, G } from "react-native-svg"

const CalendarIcon: FC<IIconProps> = (props) => {
  return (
    <Icon viewBox="0 0 20 20" {...props}>
      <G fill="none">
        <Path d="M15.8333 3.33333H4.16667C3.24619 3.33333 2.5 4.07952 2.5 4.99999V16.6667C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6667V4.99999C17.5 4.07952 16.7538 3.33333 15.8333 3.33333Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M13.3334 1.66667V5.00001" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M6.66663 1.66667V5.00001" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <Path d="M2.5 8.33333H17.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </G>
    </Icon>
  )
}

export default CalendarIcon;