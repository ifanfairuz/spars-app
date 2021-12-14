import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { VStack, Input, SearchIcon, Text, Box, FlatList, Pressable, HStack, CloseIcon, SectionList } from 'native-base';
import { ListRenderItem, RefreshControl } from 'react-native';
import { GlassBg, KeluhanUser, ButtonScan, ReportCardTeknisiPreventif, CalendarIcon } from '@components';
import { UserScreenProps } from '.';
import KeluhanUserContext from '@context/keluhan/KeluhanUserContext';
import Keluhan from '@store/models/Keluhan';
import AuthContext from '@context/AuthContext';
import Pemeliharaan from '@store/models/Pemeliharaan';
import PemeliharaanUserContext from '@context/pemeliharaan/PemeliharaanUserContext';
import moment, { Moment } from 'moment';
import DateTimePicker, { AndroidEvent } from '@react-native-community/datetimepicker';

export type ListKeluhanProps = UserScreenProps<'ListKeluhan'>;

const ListKeluhan: FC<ListKeluhanProps> = ({ navigation }) => {
  const keluhanContext = useContext(KeluhanUserContext);
  const pemeliharaanContext = useContext(PemeliharaanUserContext);
  const authContext = useContext(AuthContext);
  
  const [date_filter, setDateFilter] = useState(moment());
  const [show_datepicker_filter, setShowDatepickerFilter] = useState(false);
  const goToTambahKeluhan = (code?: string) => navigation.navigate('TambahKeluhan', { code });
  const goToDetailKeluhan = (data: Keluhan) => navigation.navigate('DetailKeluhan', { data });
  const goToRiwayatPemeliharaan = (data: Pemeliharaan) => navigation.navigate('RiwayatPemeliharaanUser', { data });
  const goToTakeBarcode = () => navigation.navigate('TakeBarcode', {
    onRead: ({ data }, nav) => {
      nav.replace('TambahKeluhan', { code: data });
    }
  });

  const loading_refresh = useMemo(() => keluhanContext.state.loading || pemeliharaanContext.state.loading, [keluhanContext.state.loading, pemeliharaanContext.state.loading]);
  const refresh_pemeliharaan = (date?: Moment) => {
    pemeliharaanContext.init(date || date_filter);
  }
  const refresh = () => {
    keluhanContext.getKeluhan();
    refresh_pemeliharaan();
  }
  const datas = useMemo(() => {
    let result = [];
    if (pemeliharaanContext.state.datas.length > 0) {
      result.push({
        title: 'Pemeliharaan',
        data: pemeliharaanContext.state.datas
      });
    }
    if (keluhanContext.state.datas.length > 0) {
      result.push({
        title: 'Keluhan',
        data: keluhanContext.state.datas
      });
    }
    return result;
  }, [keluhanContext.state.datas, pemeliharaanContext.state.datas])

  useEffect(() => {
    const length = keluhanContext.state.datas?.length || 0;
    if (length <= 0) keluhanContext.getKeluhan();
    const length_pemeliharaan = pemeliharaanContext.state.datas?.length || 0;
    if (length_pemeliharaan <= 0) pemeliharaanContext.getPemeliharaan(date_filter);
  }, []);

  const renderKeluhan: ListRenderItem<any> = ({ item, index }) => {
    const isKeluhan = 'id_keluhan' in item;
    if (isKeluhan) {
      return (
        <Box px='8' pb='3' bg='white'>
          <KeluhanUser onPress={() => goToDetailKeluhan(item)} data={item} index={index} />
        </Box>
      );
    } else {
      return (
        <Box px='8' pb='3' bg='white'>
          <ReportCardTeknisiPreventif
            onRiwayat={() => goToRiwayatPemeliharaan(item)}
            data={item} />
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
        <Pressable
          flex='1'
          pr='3'
          borderRadius='8'
          bg='spars.darkgrey'
          mb='3'
          onPress={() => setShowDatepickerFilter(true)}>
          <Input
            value={date_filter.format('DD/MM/YYYY')}
            placeholder='Filter Tanggal'
            variant='unstyled'
            outlineStyle='none'
            InputRightElement={<CalendarIcon size='sm' />}
            isReadOnly />
        </Pressable>
        { show_datepicker_filter && (
          <DateTimePicker
            testID="datePickerStrat"
            mode='date'
            is24Hour={true}
            display="default"
            value={date_filter.toDate() || new Date()}
            onChange={(e: AndroidEvent, date?: Date) => {
              const d = moment(date);
              setShowDatepickerFilter(false);
              setDateFilter(d);
              refresh_pemeliharaan(d);
            }} />
        ) }
      </Box>
    </VStack>
  )

  return (
    <Box flex={1} bg='white'>
      <SectionList
        refreshControl={
          <RefreshControl
            refreshing={loading_refresh}
            onRefresh={refresh} />
        }
        sections={datas}
        keyExtractor={k => k.id_keluhan}
        keyboardShouldPersistTaps='always'
        keyboardDismissMode='on-drag'
        renderItem={renderKeluhan}
        renderSectionHeader={({ section: { title } }) => (
          <Box px='8' bg='white'>
            <Text bold fontSize='lg' my='5'>{ title }</Text>
          </Box>
        )}
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