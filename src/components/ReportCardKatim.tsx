import Keluhan from '@store/models/Keluhan';
import { getOrDash } from '@support/helpers/string';
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
      <Center
        p='4'
        borderWidth='1'
        borderStyle='dashed'
        borderColor='#BDBDBD'
        borderRadius='4'
        bg='spars.lightgrey'
        _text={{ color: 'spars.orange', fontSize: 'md' }}>
        { data.catatan_teknisi }
      </Center>
      <HStack space='sm' justifyContent='flex-start' alignItems='center'>
        <Box bg='white' borderRadius='100'>
          <Image size='xs' borderRadius='100' source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwOFeX66lJg9GvAuptHMqmITaKozykBVDAqFdLvOnrzU3ZUz36U9w8e1a6sxJWclaosmU&usqp=CAU' }} alt='profile' />
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