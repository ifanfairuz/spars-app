import React, { FC, useMemo } from 'react';
import { HStack, Pressable, Text, VStack } from 'native-base';
import Label from './Label';
import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import Keluhan from '@store/models/Keluhan';
import { ellipsis, getOrDash } from '@support/helpers/string';

export interface KeluhanUserProps extends IVStackProps {
  data: Keluhan
  index: number
  onPress?: () => void
}

const KeluhanUser: FC<KeluhanUserProps> = ({ onPress, data, index, ...props }) => {
  const status_color = useMemo(() => data.status == 'Proses' ? 'spars.orange' : 'spars.green2', []);

  return (
    <Pressable onPress={onPress}>
      <VStack
        {...props}
        overflow='hidden'
        borderWidth='1' borderColor='spars.darkgrey' borderRadius='12'
        space={3}>
        <HStack px='5' pt='5' justifyContent='space-between' alignItems='center'>
          {!!data.insiden && <Label>{ data.insiden }</Label>}
          <Text color='spars.grey'>{ data.tgl_masuk }</Text>
        </HStack>
        <VStack px='5'>
          <HStack justifyContent='space-between' alignItems='flex-start'>
            <Text fontWeight='700' flex='1'>{ data.nama_alat }</Text>
            <Text>{ ellipsis(data.nama_ruangan, 20) }</Text>
          </HStack>
          <Text color='spars.grey'>{ ellipsis(data.no_seri, 40) }</Text>
        </VStack>
        <HStack px='5' py='5' justifyContent='space-between' alignItems='flex-start' bg='spars.bluelight'>
          <VStack>
            <Text>{ getOrDash(data.respon_name) }</Text>
            <Text color='spars.grey'>{ data.respon_name ? 'Teknisi' : '-' }</Text>
          </VStack>
          <Text ml='auto' color={status_color} fontWeight='700'>{ data.status }</Text>
        </HStack>
      </VStack>
    </Pressable>
  );
}

export default KeluhanUser;