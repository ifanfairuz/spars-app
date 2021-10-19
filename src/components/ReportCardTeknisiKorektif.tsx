import { Box, Center, HStack, Image, Text, VStack } from 'native-base';
import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import React, { FC } from 'react';

export interface ReportCardTeknisiKorektifProps extends IVStackProps {

}

const ReportCardTeknisiKorektif: FC<ReportCardTeknisiKorektifProps> = ({ ...props }) => {
  return (
    <VStack space='md' p='5' borderWidth='1' borderColor='spars.darkgrey' borderRadius='8' {...props}>
      <HStack alignItems='flex-start' justifyContent='space-between'>
        <VStack>
          <Text fontSize='md' bold>Hematology Analyzer</Text>
          <HStack space='sm'>
            <Text color='spars.grey' fontWeight='light'>Merk Alat</Text>
            <Text color='spars.grey' bold>Lab A12</Text>
          </HStack>
        </VStack>
      </HStack>
      <VStack>
        <Text>Kerusakan</Text>
        <Text color='spars.grey'>Sensor tidak Berfungsi</Text>
      </VStack>
      <Center
        p='4'
        borderWidth='1'
        borderStyle='dashed'
        borderColor='#BDBDBD'
        borderRadius='4'
        bg='spars.lightgrey'
        _text={{ color: 'spars.orange', fontSize: 'md' }}>
        Berfungsi Kembali
      </Center>
      <HStack space='sm' justifyContent='flex-start' alignItems='center'>
        <Box bg='white' borderRadius='100'>
          <Image size='xs' borderRadius='100' source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwOFeX66lJg9GvAuptHMqmITaKozykBVDAqFdLvOnrzU3ZUz36U9w8e1a6sxJWclaosmU&usqp=CAU' }} alt='profile' />
        </Box>
        <VStack>
          <Text color='spars.green' bold>Ahmad Bayu</Text>
          <Text color='spars.grey' fontWeight='light'>Pelapor</Text>
        </VStack>
      </HStack>
    </VStack>
  );
}

export default ReportCardTeknisiKorektif;