import React, { FC, useState } from 'react';
import { Dimensions, ListRenderItem } from 'react-native';
import { VStack, Text, Box, TextArea, HStack, Image, ArrowBackIcon, Pressable, ScrollView } from 'native-base';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { GlassBg, Label } from '@components';
import { UserScreenProps } from '.';

export type DetailKeluhanProps = UserScreenProps<'DetailKeluhan'>;

const IMAGE = 'https://awsimages.detik.net.id/community/media/visual/2019/12/19/f934030c-8e21-4959-a9e7-659731a87eb9_169.jpeg';
const IMAGES = [IMAGE,IMAGE,IMAGE,IMAGE,IMAGE];


const DetailKeluhan: FC<DetailKeluhanProps> = ({ navigation }) => {
  const [carousel_active, setCarouselActive] = useState(0);
  const goBack = () => navigation.canGoBack() && navigation.goBack();

  const renderCarouselItem: ListRenderItem<string> = ({item, index}) => {
    return (
      <Image borderRadius='8' size='2xl' resizeMode='cover' resizeMethod='scale' src={item} alt='image' style={{ width: '100%' }} />
    );
}

  return (
    <VStack flex={1} bg='spars.green'>
      <GlassBg h='20%' />
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
        }}>
        <HStack py='8' justifyContent='center' alignItems='center'>
          <Text bold color='white' fontSize='16'>Detail Keluhan</Text>
          <Pressable position='absolute' left='6' p='2' onPress={goBack}>
            <ArrowBackIcon size='6' color='white' />
          </Pressable>
        </HStack>
        <VStack px='5' py='8' bg='white' borderTopRadius='20' minH={Dimensions.get('window').height}>
          <HStack justifyContent='space-between' mb='2'>
            <VStack>
              <Text fontWeight='700'>Hematology Analyzer</Text>
              <Text color='spars.grey'>Ruangan A1</Text>
            </VStack>
            <Box>
              <Label>KTC</Label>
            </Box>
          </HStack>
          <Text color='spars.green2' fontWeight='700'>NS124912398</Text>
          
          <Box bg='spars.bluelight' justifyContent='center' alignItems='center' borderRadius='8' my='5' p='4'>
            <Text color='spars.darkblue' fontWeight='700'>Proses Penanganan</Text>
          </Box>

          <VStack space='sm'>
            <Text fontWeight='700'>Hematology Analyzer</Text>
            <TextArea h={20} placeholder='-' textAlignVertical='top' isDisabled />
          </VStack>
          
          <HStack borderWidth='1' borderColor='spars.darkgrey' borderStyle='dashed' py='2' px='3' space='xs' alignItems='center' my='4'>
            <Image size='sm' borderRadius='100' source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwOFeX66lJg9GvAuptHMqmITaKozykBVDAqFdLvOnrzU3ZUz36U9w8e1a6sxJWclaosmU&usqp=CAU' }} alt='profile' />
            <VStack>
              <Text fontWeight='700'>Wildan Wari</Text>
              <Text fontWeight='400'>Teknisi</Text>
            </VStack>
          </HStack>

          <VStack space='sm' mb='5'>
            <Text fontWeight='700'>Foto Kejadian</Text>
            <Carousel
              layout='stack'
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

          <VStack space='sm'>
            <Text fontWeight='700'>Hematology Analyzer</Text>
            <Image borderRadius='8' size='2xl' resizeMode='cover' resizeMethod='scale' src={IMAGE} alt='image' style={{ width: '100%' }} />
            <Image borderRadius='8' size='2xl' resizeMode='cover' resizeMethod='scale' src={IMAGE} alt='image' style={{ width: '100%' }} />
            <Image borderRadius='8' size='2xl' resizeMode='cover' resizeMethod='scale' src={IMAGE} alt='image' style={{ width: '100%' }} />
            <Image borderRadius='8' size='2xl' resizeMode='cover' resizeMethod='scale' src={IMAGE} alt='image' style={{ width: '100%' }} />
          </VStack>

        </VStack>
      </ScrollView>
    </VStack>
  );
}

export default DetailKeluhan;