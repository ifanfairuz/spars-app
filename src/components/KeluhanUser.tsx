import React, { FC } from 'react';
import { HStack, Pressable, Text, VStack } from 'native-base';
import Label from './Label';
import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack';

export interface KeluhanUserProps extends IVStackProps {
  onPress?: () => void
}

const KeluhanUser: FC<KeluhanUserProps> = ({ onPress, ...props }) => {
  return (
    <Pressable onPress={onPress}>
      <VStack
        {...props}
        overflow='hidden'
        borderWidth='1' borderColor='spars.darkgrey' borderRadius='12'
        space={3}>
        <HStack px='5' pt='5' justifyContent='space-between' alignItems='center'>
          <Label>KTC</Label>
          <Text color='spars.grey'>19 Jan 2021</Text>
        </HStack>
        <HStack px='5' justifyContent='space-between' alignItems='flex-start'>
          <VStack>
            <Text fontWeight='700'>Hematology Analyzer</Text>
            <Text color='spars.grey'>NS123813</Text>
          </VStack>
          <Text>Ruangan A1</Text>
        </HStack>
        <HStack px='5' py='5' justifyContent='space-between' alignItems='flex-start' bg='spars.bluelight'>
          <VStack>
            <Text>Wildan Wari</Text>
            <Text color='spars.grey' fontSize='xs'>Teknisi</Text>
          </VStack>
          <Text color='spars.green2' fontWeight='700'>Selesai</Text>
        </HStack>
      </VStack>
    </Pressable>
  );
}

export default KeluhanUser;