import React, { FC, Fragment, useContext, useMemo, useState } from 'react';
import { Dimensions, ListRenderItem, RefreshControl } from 'react-native';
import { VStack, Text, Box, TextArea, HStack, Image, ArrowBackIcon, Pressable, ScrollView } from 'native-base';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { GlassBg, Label } from '@components';
import { UserScreenProps } from '.';
import { getOrDash } from '@support/helpers/string';
import { imageKeluhan, imagePenanganan, imageProfile } from '@support/helpers/image';
import KeluhanUserContext from '@context/keluhan/KeluhanUserContext';

export type DetailKeluhanProps = UserScreenProps<'DetailKeluhan'>;

const DetailKeluhan: FC<DetailKeluhanProps> = ({ navigation, route }) => {
  const [carousel_active, setCarouselActive] = useState(0);
  const keluhanContext = useContext(KeluhanUserContext);

  const goBack = () => navigation.canGoBack() && navigation.goBack();

  const data = useMemo(() => {
    const { data } = route.params;
    const foto_kejadian = [
      [data.detail.foto_mini_1, data.detail.foto_zoom_1],
      [data.detail.foto_mini_2, data.detail.foto_zoom_2],
      [data.detail.foto_mini_3, data.detail.foto_zoom_3]
    ].filter(i => (i[0] && i[0] !== ''));
    const foto_penanganan = [
      [data.detail.foto_penanganan_mini_1, data.detail.foto_penanganan_zoom_1],
      [data.detail.foto_penanganan_mini_2, data.detail.foto_penanganan_zoom_2],
      [data.detail.foto_penanganan_mini_3, data.detail.foto_penanganan_zoom_3]
    ].filter(i => (i[0] && i[0] !== ''));
    return {
      ...data,
      foto_kejadian,
      foto_penanganan
    }
  }, [route.params.data])

  const renderCarouselItem: ListRenderItem<string[]> = ({item, index}) => {
    return (
      <Image borderRadius='8' size='2xl' resizeMode='cover' resizeMethod='scale' src={imageKeluhan(item[0])} alt='image' style={{ width: '100%' }} />
    );
  }

  return (
    <VStack flex={1} bg='spars.green'>
      <GlassBg h='20%' />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={keluhanContext.state.loading}
            onRefresh={keluhanContext.getKeluhan} />
        }
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
          <HStack justifyContent='space-between' mb='2' space='xs'>
            <VStack flex='1'>
              <Text fontWeight='700' fontSize='md'>{ data.nama_alat }</Text>
              <Text color='spars.grey'>{ data.nama_ruangan }</Text>
            </VStack>
            <Box>
              {!!data.insiden && <Label>{ data.insiden }</Label>}
            </Box>
          </HStack>
          <Text color='spars.green2' fontWeight='700'>{ data.no_seri }</Text>
          
          <Box bg='spars.bluelight' justifyContent='center' alignItems='center' borderRadius='8' my='5' p='4'>
            <Text color='spars.darkblue' fontWeight='700'>{ data.status }</Text>
          </Box>

          <VStack space='sm' mb='5'>
            <Text fontWeight='700'>Deskripsi Keluhan</Text>
            <TextArea h={20} fontWeight='normal' placeholder='-' textAlignVertical='top' isDisabled value={data.detail.deskripsi_keluhan} />
          </VStack>

          {
            data.foto_kejadian.length > 0 &&
            <VStack space='sm' mb='5'>
              <Text fontWeight='700'>Foto Kejadian</Text>
              <Carousel
                layout='stack'
                data={data.foto_kejadian}
                renderItem={renderCarouselItem}
                keyExtractor={item => `${data.id_keluhan}-${item[0]}`}
                sliderWidth={Dimensions.get('window').width-40}
                itemWidth={Dimensions.get('window').width-40}
                onSnapToItem={i => setCarouselActive(i)} />
              <Pagination
                dotsLength={data.foto_kejadian.length}
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
          }

          {!!data.id_teknisi && (
            <Fragment>
              <HStack borderWidth='1' borderColor='spars.darkgrey' borderStyle='dashed' py='2' px='3' space='xs' alignItems='center' my='4'>
                <Image size='sm' borderRadius='100' src={imageProfile(data.foto_teknisi)} alt='profile' />
                <VStack>
                  <Text fontWeight='700'>{ getOrDash(data.respon_name) }</Text>
                  <Text fontWeight='400'>Teknisi</Text>
                </VStack>
              </HStack>
              <VStack space='sm' mb='5'>
                <Text fontWeight='700'>Catatan Teknisi</Text>
                <TextArea h={20} fontWeight='normal' placeholder='-' textAlignVertical='top' isDisabled value={data.catatan_teknisi} />
              </VStack>
            </Fragment>
          )}
          { data.status === 'Selesai' && (
            <Fragment>
              <VStack space='sm' mb='5'>
                <Text fontWeight='700'>Hasil Penanganan</Text>
                <TextArea h={20} fontWeight='normal' placeholder='-' textAlignVertical='top' isDisabled value={data.hasil_penanganan} />
              </VStack>
            </Fragment>
          )}
          
          {
            data.foto_penanganan.length > 0 &&
            <VStack space='sm'>
              <Text fontWeight='700'>Foto Kejadian</Text>
              { data.foto_penanganan.map(item => 
                <Image
                  key={`${data.id_keluhan}-${item[0]}`}
                  borderRadius='8'
                  size='2xl'
                  resizeMode='cover'
                  resizeMethod='scale'
                  src={imagePenanganan(item[0])}
                  alt='image'
                  style={{ width: '100%' }} />) }
            </VStack>
          }

        </VStack>
      </ScrollView>
    </VStack>
  );
}

export default DetailKeluhan;