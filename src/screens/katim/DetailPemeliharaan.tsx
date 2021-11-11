import React, { FC, useState } from 'react';
import { VStack, ScrollView, Box, HStack, Input, TextArea, Text, Pressable, Image, Button, Radio, Center } from 'native-base';
import { KatimScreenProps } from '.';
import { CollapseInfo, FileIcon } from '@components';
import { IHStackProps } from 'native-base/lib/typescript/components/primitives/Stack/HStack';

const SAMPLE = [
  'https://media.istockphoto.com/photos/medical-vital-signs-monitor-in-a-hospital-picture-id901063844?k=20&m=901063844&s=612x612&w=0&h=ZHWhvQQbuh4AzmS5o--tXsGGqGLnHbei23V5J6o36e0=',
  'https://www.marksanglobal.com/img/products/complex-medical0101.jpg',
  'https://2.imimg.com/data2/YF/WB/MY-2527726/medical-divison-machines-250x250.jpg',
];

const InfoItem: FC<{ label: string, value: string } & IHStackProps> = ({ label, value, ...props }) => {
  return (
    <HStack
      py='4'
      justifyContent='space-between'
      alignItems='center'
      borderBottomWidth='1'
      borderColor='#DEDEDE'
      borderStyle='dashed'
      {...props}>
      <Text color='spars.grey'>{label}</Text>
      <Text bold>{value}</Text>
    </HStack>
  );
}
const InfoFile: FC = () => {
  return (
    <HStack
      py='2'
      justifyContent='space-between'
      alignItems='center'>
      <HStack
        alignItems='center'
        space='sm'>
        <Image source={{ uri: SAMPLE[0] }} size='xs' borderRadius='4' />
        <Text>file-pemeliharaan.pdf</Text>
      </HStack>
      <FileIcon size='sm' />
    </HStack>
  );
}

export type DetailPemeliharaanProps = KatimScreenProps<'DetailPemeliharaan'>;

const DetailPemeliharaan: FC<DetailPemeliharaanProps> = ({ navigation }) => {
  const [pelaksana, SetPelaksana] = useState('teknisi')

  return (
    <Box flex='1' bg='white'>
      <ScrollView>
        <VStack p='5' space='md'>

          <CollapseInfo label='Info Dokumen' autoOpen={true} mb='5'>
            <InfoItem label='Jenis Pemeliharaan' value='Jenis Pemeliharaan' />
            <InfoItem label='Kategori Alat' value='Kategori Alat' />
            <InfoItem label='Tgl Terjadwal' value='Tgl Terjadwal' />
            <InfoItem label='Tgl Pelaksanaan' value='Tgl Pelaksanaan' borderBottomWidth='0' />
            <InfoFile />
            <InfoFile />
          </CollapseInfo>
          
          <CollapseInfo label='Detail Alat' autoOpen={true} mb='5'>
            <InfoItem label='Nama Alat' value='Nama Alat' />
            <InfoItem label='Nomor Seri' value='Nomor Seri' />
            <InfoItem label='Ruangan' value='Ruangan' />
          </CollapseInfo>

          <CollapseInfo label='Hasil Pemeliharaan' autoOpen={true} mb='5'>
            <InfoItem label='Pelaksana' value='Teknisi' />
            <InfoItem label='Hasil Pemeliharaan' value='Baik' borderBottomWidth='0' />
            <Center
              p='4'
              my='5'
              borderWidth='1'
              borderStyle='dashed'
              borderColor='#BDBDBD'
              borderRadius='4'
              bg='spars.lightgrey'
              _text={{ color: 'spars.orange', fontSize: 'md' }}>
                Kondisi Sangat Baik
            </Center>
            <HStack space='2xs' justifyContent='space-around' mb='5'>
              { SAMPLE.map(uri => (
                <Box position='relative' borderRadius='8' overflow='hidden' key={uri}>
                  <Image size='lg' source={{ uri }} alt='image' />
                  <Button
                    size='5'
                    borderRadius='4'
                    alignItems='center'
                    justifyContent='center'
                    position='absolute' right='2' top='2'
                    bg='rgba(0, 0, 0, 0.7)'>
                    <Image size='3' source={require('@assets/images/icon_times.png')} />
                  </Button>
                </Box>
              )) }
            </HStack>
          </CollapseInfo>

        </VStack>
      </ScrollView>
    </Box>
  );
}

export default DetailPemeliharaan;