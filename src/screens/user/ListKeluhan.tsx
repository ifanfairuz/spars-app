import React, { FC, useContext, useEffect } from 'react';
import { VStack, Input, SearchIcon, Text, Box, FlatList, Pressable, HStack, CloseIcon } from 'native-base';
import { ListRenderItem, RefreshControl } from 'react-native';
import { GlassBg, KeluhanUser, ButtonScan, ReportCardTeknisiPreventif } from '@components';
import { UserScreenProps } from '.';
import KeluhanUserContext from '@context/keluhan/KeluhanUserContext';
import Keluhan from '@store/models/Keluhan';
import AuthContext from '@context/AuthContext';
import Pemeliharaan from '@store/models/Pemeliharaan';

export type ListKeluhanProps = UserScreenProps<'ListKeluhan'>;

const ListKeluhan: FC<ListKeluhanProps> = ({ navigation }) => {
  const keluhanContext = useContext(KeluhanUserContext);
  const authContext = useContext(AuthContext);

  const goToTambahKeluhan = (code?: string) => navigation.navigate('TambahKeluhan', { code });
  const goToDetailKeluhan = (data: Keluhan) => navigation.navigate('DetailKeluhan', { data });
  const goToRiwayatPemeliharaan = () => navigation.navigate('RiwayatPemeliharaanUser');
  const goToTakeBarcode = () => navigation.navigate('TakeBarcode', {
    onRead: ({ data }, nav) => {
      nav.replace('TambahKeluhan', { code: data });
    }
  });

  useEffect(() => {
    const length = keluhanContext.state.datas?.length || 0;
    if (length <= 0) keluhanContext.getKeluhan();
  }, []);

  const renderKeluhan: ListRenderItem<any> = ({ item, index }) => {
    const isKeluhan = 'id_keluhan' in item;
    if (isKeluhan) {
      return (
        <Box px='8' pb='3' bg='white'>
          {(index == 1) && <Text bold fontSize='lg' my='5'>Keluhan</Text>}
          <KeluhanUser onPress={() => goToDetailKeluhan(item)} data={item} index={index} />
        </Box>
      );
    } else {
      return (
        <Box px='8' pb='3' bg='white'>
          {(index == 0) && <Text bold fontSize='lg' mb='5'>Pemeliharaan</Text>}
          <ReportCardTeknisiPreventif
            onRiwayat={goToRiwayatPemeliharaan} />
        </Box>
      );
    }
  }

  const renderHeader = () => (
    <VStack bg='spars.green'>
      <GlassBg />
      <HStack p='5' space='xs'>
        <Input
          flex='1'
          clearButtonMode='while-editing'
          defaultValue={keluhanContext.state.search}
          onSubmitEditing={e => keluhanContext.search(e.nativeEvent.text)}
          borderWidth='0'
          bg='rgba(0,0,0,0.2)'
          px='5' py='3'
          color='white'
          fontSize='14px'
          lineHeight='22px'
          placeholder='Cari Keluhan'
          placeholderTextColor='white'
          selectTextOnFocus={true}
          autoCapitalize='none'
          returnKeyType='search'
          underlineColorAndroid='transparent'
          autoCorrect={true}
          autoFocus={false}
          InputRightElement={<SearchIcon color='white' size='18px' mr='5' />} />
        <Pressable
          px='3'
          justifyContent='center'
          bg='rgba(0,0,0,0.2)'
          borderRadius='8'
          onPress={authContext.logout}>
          <CloseIcon size='xs' color='white' />
        </Pressable>
      </HStack>
      <Box px='5' pt='5' bg='white' borderTopRadius='20'>
      </Box>
    </VStack>
  )

  return (
    <Box flex={1} bg='white'>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={keluhanContext.state.loading}
            onRefresh={keluhanContext.getKeluhan} />
        }
        data={[{ is_pemeliharaan: true }, ...keluhanContext.state.datas]}
        keyExtractor={k => k.id_keluhan}
        keyboardShouldPersistTaps='always'
        keyboardDismissMode='on-drag'
        renderItem={renderKeluhan}
        nestedScrollEnabled={true}
        ListHeaderComponent={renderHeader()}
        ListFooterComponent={<Box height='8' bg='white' />}
        contentContainerStyle={{
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
        }} />

      <Box bg='white' bottom='0' shadow='10.black' p='5'>
        <Pressable p='2' onPress={() => goToTambahKeluhan()}>
          <Text bold color='spars.orange'>+ TAMBAH LAPORAN KELUHAN</Text>
        </Pressable>
        <ButtonScan position='absolute' right='5' top={-20} onPress={goToTakeBarcode} />
      </Box>
    </Box>
  );
}

export default ListKeluhan;