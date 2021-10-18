import React, { FC } from 'react';
import { Box, IBoxProps, Text } from 'native-base';
import { gradient } from '@config/native-base';

const Label: FC<IBoxProps> = ({ children, ...props }) => {
  return (
    <Box px='5' py='1' borderRadius='100' bg={gradient.blue} {...props}>
      <Text fontWeight='700' color='white' {...props._text}>{children}</Text>
    </Box>
  );
}

export default Label;