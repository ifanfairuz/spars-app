import React, { FC } from 'react';
import { VStack, ScrollView, Select, Box, HStack, Input, TextArea, Text, Pressable, Image, Button, Center } from 'native-base';
import { ButtonScan } from '@components';
import { UserScreenProps } from '.';

const SAMPLE = [
  'https://media.istockphoto.com/photos/medical-vital-signs-monitor-in-a-hospital-picture-id901063844?k=20&m=901063844&s=612x612&w=0&h=ZHWhvQQbuh4AzmS5o--tXsGGqGLnHbei23V5J6o36e0=',
  'https://www.marksanglobal.com/img/products/complex-medical0101.jpg',
  'https://2.imimg.com/data2/YF/WB/MY-2527726/medical-divison-machines-250x250.jpg',
];

export type TambahKeluhanProps = UserScreenProps<'TambahKeluhan'>;

const TambahKeluhan: FC<TambahKeluhanProps> = ({ navigation }) => {
  const goToPhoto = () => navigation.navigate('TakePhoto');
  const goToTakeBarcode = () => navigation.navigate('TakeBarcode');
  
  return (
    <Box flex='1' bg='white'>
      <ScrollView>
        <VStack p='5' space='md'>
          
          <HStack borderWidth='1' borderRadius='8' overflow='hidden' borderColor='spars.darkgrey' p='0' bg='spars.lightgrey'>
            <Select flex='1' placeholder='Hematology Analys' borderWidth='0' borderRadius='0' m='0'>
              <Select.Item label="UX Research" value="ux" />
              <Select.Item label="Web Development" value="web" />
            </Select>
            <Box justifyContent='center' alignItems='center' px='2' bg='white'>
              <ButtonScan p='3' imageProps={{ size: 5 }} onPress={goToTakeBarcode} />
            </Box>
          </HStack>

          <Input placeholder='Ruangan A1' />

          <Input placeholder='NS12039103' />

          <Select placeholder='KTC'>
            <Select.Item label="UX Research" value="ux" />
            <Select.Item label="Web Development" value="web" />
          </Select>

          <TextArea h={40} placeholder='Deskripsikan keluhan' textAlignVertical='top' />

          <Pressable
            p='4'
            bg='spars.lightgrey'
            borderWidth='1'
            borderColor='spars.darkgrey'
            borderRadius='8'
            borderStyle='dashed'
            justifyContent='space-between'
            flexDir='row'
            onPress={goToPhoto}>
            <Text fontSize='14' fontWeight='700' color='spars.grey'>Upload Foto (Maks 3x)</Text>
            <Image size='2xs' source={require('@assets/images/icon_camera.png')} />
          </Pressable>

          <HStack space='2xs' justifyContent='space-around' mb='20'>
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

          <Button
            py={5}
            size='lg'
            bg='spars.orange'
            shadow='9.orange'
            _text={{ color: 'white' }}
            _pressed={{ bg: 'spars.orange', opacity: 0.8 }}>
            Tambah Keluhan
          </Button>

        </VStack>
      </ScrollView>
    </Box>
  );
}

export default TambahKeluhan;