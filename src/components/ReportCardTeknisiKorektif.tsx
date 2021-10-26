import Keluhan from '@store/models/Keluhan';
import { imageProfile } from '@support/helpers/image';
import { ellipsis } from '@support/helpers/string';
import { Box, Center, HStack, Image, Text, VStack } from 'native-base';
import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import React, { FC } from 'react';
import { Pressable } from 'react-native';

export interface ReportCardTeknisiKorektifProps extends IVStackProps {
  data: Keluhan
  onPress?: () => void
}

const ReportCardTeknisiKorektif: FC<ReportCardTeknisiKorektifProps> = ({ onPress, data, ...props }) => {
  return (
    <Pressable onPress={onPress}>
      <VStack space='md' p='5' borderWidth='1' borderColor='spars.darkgrey' borderRadius='8' {...props}>
        <HStack alignItems='flex-start' justifyContent='space-between'>
          <VStack>
            <Text fontSize='md' bold>{ data.nama_alat }</Text>
            <Text color='spars.grey' fontWeight='light'>{ data.no_seri }</Text>
            <Text color='spars.grey' bold>{ data.nama_ruangan }</Text>
          </VStack>
        </HStack>
        <VStack>
          <Text>Kerusakan</Text>
          <Text color='spars.grey'>{ ellipsis(data.detail.deskripsi_keluhan, 30) }</Text>
        </VStack>
        {!!data.catatan_teknisi && <Center
          p='4'
          borderWidth='1'
          borderStyle='dashed'
          borderColor='#BDBDBD'
          borderRadius='4'
          bg='spars.lightgrey'
          _text={{ color: 'spars.orange', fontSize: 'md' }}>
          { ellipsis(data.catatan_teknisi, 30) }
        </Center>}
        <HStack space='sm' justifyContent='flex-start' alignItems='center'>
          <Box bg='white' borderRadius='100'>
            <Image size='xs' borderRadius='100' src={imageProfile(data.foto_user)} alt='profile' />
          </Box>
          <VStack>
            <Text color='spars.green' bold>{ data.nama_user }</Text>
            <Text color='spars.grey' fontWeight='light'>Pelapor</Text>
          </VStack>
        </HStack>
      </VStack>
    </Pressable>
  );
}

export default ReportCardTeknisiKorektif;