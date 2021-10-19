import React, { FC, useState } from 'react';
import { VStack, ScrollView, Box, HStack, Input, TextArea, Text, Pressable, Image, Button, Radio } from 'native-base';
import { TeknisiScreenProps } from '.';
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

export type FormPemeliharaanProps = TeknisiScreenProps<'FormPemeliharaan'>;

const FormPemeliharaan: FC<FormPemeliharaanProps> = ({ navigation }) => {
  const [pelaksana, SetPelaksana] = useState('teknisi')
  const goToMain = () => navigation.replace('Report');

  const submit = () => {
    goToMain();
  }

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
          
          <VStack space='sm'>
            <Text bold>Pelaksana</Text>
            <Radio.Group
              flexDirection='row'
              name="pelaksana"
              accessibilityLabel="pelaksana"
              value={pelaksana}
              onChange={v => SetPelaksana(v)}>
              <Radio flex='1' alignItems='flex-start' value="teknisi" _text={{ fontSize: 'sm' }}>
                Teknisi
              </Radio>
              <Radio flex='1' alignItems='flex-start' value="pihak3" _text={{ fontSize: 'sm' }}>
                Pihak ke-3
              </Radio>
            </Radio.Group>
            { pelaksana == 'pihak3' && (
              <Input
                ml='50%'
                py='2' px='4'
                maxW='50%'
                size='md'
                fontWeight='400'
                bg='white' />
            ) }
          </VStack>

          <TextArea h={40} placeholder='Catatan' textAlignVertical='top' />

          <Pressable
            p='4'
            bg='spars.lightgrey'
            borderWidth='1'
            borderColor='spars.darkgrey'
            borderRadius='8'
            borderStyle='dashed'
            justifyContent='space-between'
            flexDir='row'>
            <Text fontSize='14' fontWeight='700' color='spars.grey'>Upload Foto (Maks 3x)</Text>
            <Image size='2xs' source={require('@assets/images/icon_camera.png')} />
          </Pressable>

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

          <VStack space='md' mb='5'>
            <Text bold>Hasil Pemeliharaan</Text>
            <Radio.Group name='hasil_pemeliharaan' flexDirection='row' justifyContent='space-between'>
              <Radio alignItems='flex-start' value='baik'>Baik</Radio>
              <Radio alignItems='flex-start' value='kurang_baik'>Kurang Baik</Radio>
              <Radio alignItems='flex-start' value='tidak_layak'>Tidak Layak</Radio>
            </Radio.Group>
          </VStack>

          <Button
            py='4'
            size='lg'
            bg='spars.orange'
            shadow='9.orange'
            _text={{ color: 'white' }}
            _pressed={{ bg: 'spars.orange', opacity: 0.8 }}
            onPress={submit}>
            Submit
          </Button>

        </VStack>
      </ScrollView>
    </Box>
  );
}

export default FormPemeliharaan;