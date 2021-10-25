import React, { FC, useContext, useEffect, useMemo } from 'react';
import { VStack, Input, SearchIcon, Text, Box, FlatList, Pressable } from 'native-base';
import { ListRenderItem, RefreshControl } from 'react-native';
import { GlassBg, KeluhanUser, ButtonScan } from '@components';
import { UserScreenProps } from '.';
import KeluhanUserContext from '@context/keluhan/KeluhanUserContext';
import Keluhan from '@store/models/Keluhan';

export type ListKeluhanProps = UserScreenProps<'ListKeluhan'>;

const ListKeluhan: FC<ListKeluhanProps> = ({ navigation }) => {
  const keluhanContext = useContext(KeluhanUserContext);

  const goToTambahKeluhan = (code?: string) => navigation.navigate('TambahKeluhan', { code });
  const goToDetailKeluhan = (data: Keluhan) => navigation.navigate('DetailKeluhan', { data });
  const goToTakeBarcode = () => navigation.navigate('TakeBarcode', {
    onRead: ({ data }, nav) => {
      nav.replace('TambahKeluhan', { code: data });
    }
  });

  const equals = (t1: string, t2: string) => t1.toLowerCase().includes(t2.toLowerCase()) || t2.toLowerCase().includes(t1.toLowerCase());

  const keluhans = useMemo(() => {
    let { datas, search } = keluhanContext.state;
    if (search != '') datas = datas.filter(d => (
      equals(d.nama_alat, search) ||
      equals(d.nama_ruangan, search) ||
      equals(d.respon_name, search) ||
      equals(d.detail.deskripsi_keluhan, search) ||
      equals(d.status, search) ||
      equals(d.catatan_teknisi, search)
    ));
    return datas;
  }, [keluhanContext.state.datas, keluhanContext.state.search]);

  useEffect(() => {
    const length = keluhanContext.state.datas?.length || 0;
    if (length <= 0) keluhanContext.getKeluhan();
  }, []);

  const renderKeluhan: ListRenderItem<Keluhan> = ({ item, index }) => {
    return (
      <Box px='8' pb='3' bg='white'>
        <KeluhanUser onPress={() => goToDetailKeluhan(item)} data={item} index={index} />
      </Box>
    );
  }

  const renderHeader = () => (
    <VStack bg='spars.green'>
      <GlassBg />
      <Box p='5'>
        <Input
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
      </Box>
      <Box px='5' py='5' bg='white' borderTopRadius='20'>
        <Text fontWeight='700' fontSize='lg'>Keluhan</Text>
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
        data={keluhans}
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
          <Text fontWeight='700' color='spars.orange'>+ TAMBAH LAPORAN KELUHAN</Text>
        </Pressable>
        <ButtonScan position='absolute' right='5' top={-20} onPress={goToTakeBarcode} />
      </Box>
    </Box>
  );
}

export default ListKeluhan;