import React, { FC, useContext, useMemo, useState } from 'react';
import { HStack, ScrollView, Text, VStack, Pressable, ArrowBackIcon, Button, Box, Image, Center, ChevronRightIcon, TextArea, Radio, Actionsheet, Toast } from 'native-base';
import { GlassBg, Label, Loader, TakePhoto } from '@components';
import { Dimensions, ListRenderItem } from 'react-native';
import { TeknisiScreenProps } from '.';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import moment from 'moment';
import KeluhanTeknisiContext from '@context/keluhan/KeluhanTeknisiContext';
import { Asset } from 'react-native-image-picker';
import { imageKeluhan, imageProfile } from '@support/helpers/image';

export type DetailKeluhanProps = TeknisiScreenProps<'DetailKeluhan'>;

const DetailKeluhan: FC<DetailKeluhanProps> = ({ navigation, route }) => {
  const keluhanContext = useContext(KeluhanTeknisiContext);
  const [head_height, setHeadHeight] = useState(0);
  const [carousel_active, setCarouselActive] = useState(0);
  const [riwayatOpen, setRiwayatOpen] = useState(false);
  const [catatan, setCatatan] = useState('');
  const [hasil_penanganan, setHasilPenanganan] = useState('');
  const [images, setImages] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  const images_list = useMemo(() => images.map(i => i.uri || ''), [images]);
  const goBack = () => navigation.canGoBack() && navigation.goBack();
  const goToMain = () => navigation.popToTop();
  
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
  }, [route.params.data]);

  const submit = () => {
    if (!data.id_keluhan || !hasil_penanganan) {
      Toast.show({ title: 'Mohon lengkapi data', status: 'error', placement: 'top' });
      return;
    }
    setLoading(true);
    const photos = images.map(i => i.base64 || '');
    keluhanContext.tanganiKeluhan(data.id_keluhan, hasil_penanganan, catatan, photos)
    .then(success => {
      if (success) {
        success && goToMain();
        keluhanContext.getKeluhan();
      }
    })
    .finally(() => setLoading(false));
  }
  
  const renderCarouselItem: ListRenderItem<string[]> = ({ item }) => {
    return (
      <Image borderRadius='8' size='2xl' resizeMode='cover' resizeMethod='scale' src={imageKeluhan(item[0])} alt='image' style={{ width: '100%' }} />
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
              <Image size='xs' borderRadius='100' src={imageProfile(data.foto_user)} alt='profile' />
            </Box>
            <VStack>
              <Text color='spars.green' bold>{ data.nama_user }</Text>
              <Text color='spars.grey' fontWeight='light'>Pelapor</Text>
            </VStack>
            <Center
              alignSelf='flex-start'
              ml='auto'
              bg={data.id_keluhan ? 'spars.green' : 'spars.blue'}
              p='1' px='4'
              borderRadius='50'
              _text={{ fontSize: 'xs', color: 'white', letterSpacing: '1' }}>
              { data.id_keluhan ? 'Korektif' : 'Preventif' }
            </Center>
          </HStack>
          <VStack px='6' space='sm' mb='5'>
            <Carousel
              layout='tinder'
              data={data.foto_kejadian}
              renderItem={renderCarouselItem}
              keyExtractor={(i: string[]) => i[0]}
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
          <VStack px='6' space='xs'>
            <HStack alignItems='flex-start' justifyContent='space-between'>
              <VStack flex='1'>
                <Text fontSize='md' bold>{ data.nama_alat }</Text>
                <Text color='spars.grey' fontWeight='light'>{ data.no_seri }</Text>
                <Text color='spars.grey' bold>{ data.nama_ruangan }</Text>
              </VStack>
              {!!data.insiden && 
              <Label
                bg='white'
                borderWidth='1'
                borderColor='spars.orange'
                _text={{ fontSize: 'xs', color: 'spars.orange' }}>{ data.insiden }</Label>}
            </HStack>

            <Box bg='spars.bluelight' justifyContent='center' alignItems='center' borderRadius='8' p='4' flex='1'>
              <Text color='spars.darkblue' fontWeight='700'>{ data.detail.deskripsi_keluhan }</Text>
            </Box>

            <HStack justifyContent='space-between' my='1'>
              <Text color='spars.grey'>Tanggal Penanganan</Text>
              <Pressable flexDirection='row'>
                <Text bold>{ moment().format('DD MMMM YYYY') }</Text>
                <ChevronRightIcon size='sm' />
              </Pressable>
            </HStack>

            <TextArea h={40} placeholder='Catatan Teknisi' textAlignVertical='top' value={catatan} onChangeText={setCatatan} />

            <VStack space='md' mb='5'>
              <Text bold>Hasil Penanganan</Text>
              <Radio.Group name='hasil_penanganan' flexDirection='row' justifyContent='space-between' value={hasil_penanganan} onChange={setHasilPenanganan}>
                <Radio alignItems='flex-start' value='Baik'>Baik</Radio>
                <Radio alignItems='flex-start' value='Kurang Baik'>Kurang Baik</Radio>
                <Radio alignItems='flex-start' value='Tidak Layak'>Tidak Layak</Radio>
              </Radio.Group>
            </VStack>

            <TakePhoto
              values={images_list}
              onAdd={datas => {
                const data = datas.filter(d => d.uri && d.base64);
                setImages([
                  ...images,
                  ...data
                ]);
              }}
              onRemove={i => {
                images.splice(i, 1);
                setImages([...images]);
              }} />

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
            <HStack py='5' mx='5' justifyContent='space-between' borderBottomWidth='1' borderColor='#DEDEDE'>
              <Text color='spars.grey' fontSize='16'>Proses</Text>
              <Text bold>10 - 11 - 2021</Text>
            </HStack>
            <HStack py='5' mx='5' justifyContent='space-between' borderBottomWidth='1' borderColor='#DEDEDE'>
              <Text color='spars.grey' fontSize='16'>Approval</Text>
              <Text bold>11 - 11 - 2021</Text>
            </HStack>
            <HStack py='5' mx='5' justifyContent='space-between' borderBottomWidth='1' borderColor='#DEDEDE'>
              <Text color='spars.grey' fontSize='16'>Selesai</Text>
              <Text bold>12 - 11 - 2021</Text>
            </HStack>
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
      <Loader show={loading} />
    </VStack>
  );
}

export default DetailKeluhan;