import React, { FC, useState } from 'react';
import { HStack, ScrollView, Text, VStack, Pressable, ArrowBackIcon, Button, Box, Image, Center, ChevronRightIcon, TextArea, Radio, Actionsheet } from 'native-base';
import { GlassBg, Label } from '@components';
import { Dimensions, ListRenderItem } from 'react-native';
import { TeknisiScreenProps } from '.';
import Carousel, { Pagination } from 'react-native-snap-carousel';

const IMAGE = 'https://awsimages.detik.net.id/community/media/visual/2019/12/19/f934030c-8e21-4959-a9e7-659731a87eb9_169.jpeg';
const IMAGES = [IMAGE,IMAGE,IMAGE,IMAGE,IMAGE];

export type ReportProps = TeknisiScreenProps<'Report'>;

const Report: FC<ReportProps> = ({ navigation }) => {
  const [head_height, setHeadHeight] = useState(0);
  const [carousel_active, setCarouselActive] = useState(0);
  const [riwayatOpen, setRiwayatOpen] = useState(false);
  const goBack = () => navigation.canGoBack() && navigation.goBack();
  const goToMain = () => navigation.replace('Report');

  const submit = () => {
    goToMain();
  }
  
  const renderCarouselItem: ListRenderItem<string> = ({item, index}) => {
    return (
      <Image borderRadius='8' size='2xl' resizeMode='cover' resizeMethod='scale' src={item} alt='image' style={{ width: '100%' }} />
    );
  }
  
  return (
    <VStack flex={1} bg='spars.green' position='relative'>
      <GlassBg h='70%' />
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
        }}>
        <HStack space='md' p='6' justifyContent='flex-start' alignItems='center' onLayout={e => setHeadHeight(e.nativeEvent.layout.height)}>
          <Pressable p='2' onPress={goBack}>
            <ArrowBackIcon size='6' color='white' />
          </Pressable>
          <Text bold color='white' fontSize='16'>Detail Keluhan</Text>
          <Button
            ml='auto'
            bg='spars.orange'
            px='4'
            _text={{ color: 'white' }}
            _pressed={{ bg: 'spars.orange', opacity: 0.9 }}
            onPress={() => setRiwayatOpen(true)}>
            Riwayat
          </Button>
        </HStack>
        
        <VStack space='md' py='6' bg='white' borderTopRadius='20' minH={Dimensions.get('window').height - head_height}>
          <HStack px='6' space='sm' justifyContent='flex-start' alignItems='center'>
            <Box bg='white' borderRadius='100'>
              <Image size='xs' borderRadius='100' source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwOFeX66lJg9GvAuptHMqmITaKozykBVDAqFdLvOnrzU3ZUz36U9w8e1a6sxJWclaosmU&usqp=CAU' }} alt='profile' />
            </Box>
            <VStack>
              <Text color='spars.green' bold>Ahmad Bayu</Text>
              <Text color='spars.grey' fontWeight='light'>Pelapor</Text>
            </VStack>
            <Center
              alignSelf='flex-start'
              ml='auto'
              bg={true ? 'spars.blue' : 'spars.green'}
              p='1' px='4'
              borderRadius='50'
              _text={{ fontSize: 'xs', color: 'white', letterSpacing: '1' }}>
              { true ? 'Preventif' : 'Korektif' }
            </Center>
          </HStack>
          <VStack px='6' space='sm' mb='5'>
            <Carousel
              layout='tinder'
              data={IMAGES}
              renderItem={renderCarouselItem}
              sliderWidth={Dimensions.get('window').width-40}
              itemWidth={Dimensions.get('window').width-40}
              onSnapToItem={i => setCarouselActive(i)} />
            <Pagination
              dotsLength={IMAGES.length}
              activeDotIndex={carousel_active}
              containerStyle={{ justifyContent: 'flex-start', paddingVertical: 0, paddingHorizontal: 0, marginTop: 5 }}
              dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  backgroundColor: '#27AE60'
              }}
              inactiveDotStyle={{
                  backgroundColor: '#C4C4C4'
              }}
              dotContainerStyle={{
                marginHorizontal: 4
              }}
              inactiveDotOpacity={1}
              inactiveDotScale={0.7}
            />
          </VStack>
          <VStack px='6' space='xs' mb='10'>
            <HStack alignItems='flex-start' justifyContent='space-between'>
              <VStack>
                <Text fontSize='md' bold>Hematology Analyzer</Text>
                <HStack space='sm'>
                  <Text color='spars.grey' fontWeight='light'>Merk Alat</Text>
                  <Text color='spars.grey' bold>Lab A12</Text>
                </HStack>
              </VStack>
              <Label
                bg='white'
                borderWidth='1'
                borderColor='spars.orange'
                _text={{ fontSize: 'xs', color: 'spars.orange' }}>KNC</Label>
            </HStack>

            <Box bg='spars.bluelight' justifyContent='center' alignItems='center' borderRadius='8' p='4'>
              <Text color='spars.darkblue' fontWeight='700'>Sensor Tidak Berfungsi</Text>
            </Box>

            <HStack justifyContent='space-between' my='1'>
              <Text color='spars.grey'>Tanggal Penanganan</Text>
              <Pressable flexDirection='row'>
                <Text bold>19 Februari 2021</Text>
                <ChevronRightIcon size='sm' />
              </Pressable>
            </HStack>

            <TextArea h={40} placeholder='Catatan Teknisi' textAlignVertical='top' />

            <VStack space='md' mb='5'>
              <Text bold>Hasil Penanganan</Text>
              <Radio.Group name='hasil_penanganan' flexDirection='row' justifyContent='space-between'>
                <Radio alignItems='flex-start' value='baik'>Baik</Radio>
                <Radio alignItems='flex-start' value='kurang_baik'>Kurang Baik</Radio>
                <Radio alignItems='flex-start' value='tidak_layak'>Tidak Layak</Radio>
              </Radio.Group>
            </VStack>
          </VStack>
          <HStack px='6' space='md'>
            <Button
              flex='1'
              size='lg'
              py='3'
              variant='outline' 
              borderColor='spars.grey' _text={{ color: 'black' }}
              _pressed={{ bg: 'white', opacity: 0.8, borderColor: 'spars.grey' }}
              onPress={goBack}>
              Belum Selesai
            </Button>
            <Button
              flex='1'
              size='lg'
              py='3'
              bg='spars.orange'
              _text={{ color: 'white' }} shadow='9.orange'
              _pressed={{ bg: 'spars.orange', opacity: 0.8 }}
              onPress={submit}>
              Selesai
            </Button>
          </HStack>
        </VStack>
      </ScrollView>
      <Actionsheet isOpen={riwayatOpen} onClose={() => setRiwayatOpen(false)}>
        <Actionsheet.Content>
          <ScrollView width="100%">
            {[1,2,3,4,5].map(r => (
              <HStack py='5' mx='5' justifyContent='space-between' borderBottomWidth='1' borderColor='#DEDEDE'>
                <Text color='spars.grey' fontSize='16'>Keluhan</Text>
                <Text bold>10 - 11 - 2021</Text>
              </HStack>
            ))}
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </VStack>
  );
}

export default Report;