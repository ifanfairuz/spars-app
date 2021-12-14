import Pemeliharaan from '@store/models/Pemeliharaan';
import { getOrDash } from '@support/helpers/string';
import moment from 'moment';
import { Box, Button, Center, HStack, Text, VStack } from 'native-base';
import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import React, { FC } from 'react';

export interface ReportCardTeknisiPreventifProps extends IVStackProps {
  data: Pemeliharaan
  onPemeliharaan?: () => void
  onRiwayat?: () => void
  isDetail?: boolean
}

const ReportCardTeknisiPreventif: FC<ReportCardTeknisiPreventifProps> = ({ onPemeliharaan, onRiwayat, data, isDetail, ...props }) => {
  return (
    <VStack space='md' p='5' bg='white' shadow='5' borderRadius='8' {...props}>
      <Text fontSize='md' bold>{ data.nama_alat }</Text>
      <VStack>
        <Text color='spars.green' fontSize='xs' bold>{ getOrDash(data.no_seri) }</Text>
        <Text color='spars.grey' fontWeight='light'>{ getOrDash(data.merk) }</Text>
        <Text color='spars.grey' bold>{ getOrDash(data.nama_ruangan) }</Text>
      </VStack>
      <HStack>
        <Box flex='1'>
          <Text color='spars.grey' letterSpacing='0.5'>Tgl Terjadwal</Text>
          <Text bold>{ moment(data.tgl_jadwal, 'YYYY-MM-DD')?.format('DD MMMM YYYY') }</Text>
        </Box>
        { !!data.tgl_pelaksanaan && data.tgl_pelaksanaan != '0000-00-00' && (
          <Box flex='1'>
            <Text color='spars.grey' letterSpacing='0.5'>Tgl Pemeliharaan</Text>
            <Text bold>{ moment(data.tgl_pelaksanaan, 'YYYY-MM-DD')?.format('DD MMMM YYYY') }</Text>
          </Box>
        ) }
      </HStack>
      {isDetail && (
        <VStack space='md'>
          {!!data.hasil_pemeliharaan && <Box flex='1'>
            <Text color='spars.grey' letterSpacing='0.5'>Hasil Pemeliharaan</Text>
            <Text bold>{ data.hasil_pemeliharaan }</Text>
          </Box>}
          <Center
            p='4'
            borderWidth='1'
            borderStyle='dashed'
            borderColor='#BDBDBD'
            borderRadius='4'
            bg='spars.lightgrey'
            _text={{ color: 'spars.orange', fontSize: 'md' }}>
              Kondisi Sangat Baik
            </Center>
        </VStack>
      )}
      <HStack space='md'>
        {!!onRiwayat && (
          <Button
            flex='1'
            variant='outline' 
            borderColor='spars.grey' _text={{ color: 'black' }}
            _pressed={{ bg: 'white', opacity: 0.8, borderColor: 'spars.grey' }}
            onPress={onRiwayat}>
            Cek Riwayat
          </Button>
        )}
        {!!onPemeliharaan && (
          <Button
            flex='1'
            bg='spars.orange'
            _text={{ color: 'white' }} shadow='9.orange'
            _pressed={{ bg: 'spars.orange', opacity: 0.8 }}
            onPress={onPemeliharaan}>
            Pemeliharaan
          </Button>
        )}
      </HStack>
    </VStack>
  );
}

export default ReportCardTeknisiPreventif;