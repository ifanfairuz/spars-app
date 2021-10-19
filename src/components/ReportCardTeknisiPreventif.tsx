import { Box, Button, Center, HStack, Image, Text, VStack } from 'native-base';
import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import React, { FC } from 'react';

export interface ReportCardTeknisiPreventifProps extends IVStackProps {
  onPemeliharaan?: () => void
  onRiwayat?: () => void
}

const ReportCardTeknisiPreventif: FC<ReportCardTeknisiPreventifProps> = ({ onPemeliharaan, onRiwayat, ...props }) => {
  return (
    <VStack space='md' p='5' bg='white' shadow='5' borderRadius='8' {...props}>
      <HStack alignItems='center' justifyContent='space-between'>
        <VStack>
          <Text fontSize='md' bold>Hematology Analyzer</Text>
          <Text color='spars.green' fontSize='xs' bold>NS1231238</Text>
          <Text color='spars.grey' fontWeight='light'>Merk Alat</Text>
        </VStack>
        <Text color='spars.grey' bold>Lab A12</Text>
      </HStack>
      <HStack>
        <Box flex='1'>
          <Text color='spars.grey' letterSpacing='0.5'>Tgl Pelaporan</Text>
          <Text bold>01 Januari 2021</Text>
        </Box>
        <Box flex='1'>
          <Text color='spars.grey' letterSpacing='0.5'>Tgl Approval Katim</Text>
          <Text bold>01 Januari 2021</Text>
        </Box>
      </HStack>
      <HStack space='md'>
        <Button
          flex='1'
          variant='outline' 
          borderColor='spars.grey' _text={{ color: 'black' }}
          _pressed={{ bg: 'white', opacity: 0.8, borderColor: 'spars.grey' }}
          onPress={onRiwayat}>
          Cek Riwayat
        </Button>
        <Button
          flex='1'
          bg='spars.orange'
          _text={{ color: 'white' }} shadow='9.orange'
          _pressed={{ bg: 'spars.orange', opacity: 0.8 }}
          onPress={onPemeliharaan}>
          Pemeliharaan
        </Button>
      </HStack>
    </VStack>
  );
}

export default ReportCardTeknisiPreventif;