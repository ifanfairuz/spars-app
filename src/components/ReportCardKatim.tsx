import Keluhan from '@store/models/Keluhan';
import { getColorHasilPenanganan } from '@support/helpers/functions';
import { imageProfile } from '@support/helpers/image';
import { ellipsis, getOrDash } from '@support/helpers/string';
import { Box, Center, HStack, Image, Text, VStack } from 'native-base';
import React, { FC } from 'react';
import Label from './Label';

const ReportCard: FC<{ data: Keluhan }> = ({ data }) => {
  return (
    <VStack space='md' p='5' borderWidth='1' borderColor='spars.darkgrey' borderRadius='8'>
      <HStack alignItems='flex-start' justifyContent='space-between'>
        <VStack flex='1'>
          <Text fontSize='md' bold>{ data.nama_alat }</Text>
          <Text color='spars.grey' fontWeight='light' flex='1'>{ data.no_seri }</Text>
          <Text color='spars.grey' bold flex='1'>{ data.nama_ruangan }</Text>
        </VStack>
        {!!data.insiden && <Label
          bg='white'
          borderWidth='1'
          borderColor='spars.orange'
          _text={{ fontSize: 'xs', color: 'spars.orange' }}>{ data.insiden }</Label>}
      </HStack>
      <VStack>
        <Text>Kerusakan</Text>
        <Text color='spars.grey'>{ getOrDash(data.detail.deskripsi_keluhan) }</Text>
      </VStack>
      { !!data.hasil_penanganan && (
        <VStack>
          <Text>Hasil Penanganan</Text>
          <Text color={getColorHasilPenanganan(data.hasil_penanganan)}>{ data.hasil_penanganan }</Text>
        </VStack>
      ) }
      { !!data.catatan_teknisi && (
        <Center
        p='4'
        borderWidth='1'
        borderStyle='dashed'
        borderColor='#BDBDBD'
        borderRadius='4'
        bg='spars.lightgrey'
        _text={{ color: 'spars.blue', fontSize: 'md' }}>
          { ellipsis(data.catatan_teknisi, 30) }
        </Center>
      ) }
      <HStack space='sm' justifyContent='flex-start' alignItems='center'>
        <Box bg='white' borderRadius='100'>
          <Image size='xs' borderRadius='100' src={imageProfile(data.foto_teknisi)} alt='profile' />
        </Box>
        <VStack>
          <Text color='spars.green' bold>{ data.nama_user }</Text>
          <Text color='spars.grey' fontWeight='light'>Pelapor</Text>
        </VStack>
      </HStack>
    </VStack>
  );
}

export default ReportCard;