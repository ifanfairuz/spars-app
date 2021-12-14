import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { HStack, Text, VStack, Pressable, ChevronRightIcon, Box, FlatList, Actionsheet, ScrollView, Select, ChevronDownIcon, Center, CloseIcon, Input } from 'native-base';
import { CalendarIcon, GlassBg, ReportCardTeknisiKorektif, ReportCardTeknisiPreventif } from '@components';
import { ListRenderItem, RefreshControl } from 'react-native';
import DateTimePicker, { AndroidEvent } from '@react-native-community/datetimepicker';
import { TeknisiScreenProps } from '.';
import KeluhanTeknisiContext from '@context/keluhan/KeluhanTeknisiContext';
import Keluhan from '@store/models/Keluhan';
import AuthContext from '@context/AuthContext';
import { getOrDash } from '@support/helpers/string';
import moment, { Moment } from 'moment';
import Pemeliharaan from '@store/models/Pemeliharaan';
import PemeliharaanTeknisiContext from '@context/pemeliharaan/PemeliharaanTeknisiContext';

export type DataTugasProps = TeknisiScreenProps<'DataTugas'>;

const DataTugas: FC<DataTugasProps> = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const keluhanContext = useContext(KeluhanTeknisiContext);
  const pemeliharaanContext = useContext(PemeliharaanTeknisiContext);
  const [date_filter, setDateFilter] = useState(moment());
  const [show_datepicker_filter, setShowDatepickerFilter] = useState(false);
  const [riwayatOpen, setRiwayatOpen] = useState<Keluhan|undefined>(undefined);
  const goToDetailPemeliharaan = (data: Pemeliharaan) => {
    if (data.hasil_pemeliharaan && data.hasil_pemeliharaan != '') {
      return navigation.navigate('DetailPemeliharaan', { data });
    }
    return navigation.navigate('FormPemeliharaan', { data });
  }
  const goToRiwayatPemeliharaan = (data: Pemeliharaan) => navigation.navigate('RiwayatPemeliharaan', { data });
  const goToReport = () => navigation.navigate('Report');
  const goToFormKeluhan = (data: Keluhan) => navigation.navigate('DetailKeluhan', { data });

  const loading_refresh = useMemo(() => keluhanContext.state.loading || pemeliharaanContext.state.loading, [keluhanContext.state.loading, pemeliharaanContext.state.loading]);
  const refresh_pemeliharaan = (date?: Moment) => {
    pemeliharaanContext.init(date || date_filter);
  }
  const refresh = () => {
    keluhanContext.init();
    refresh_pemeliharaan();
  }


  const datas = useMemo(() => {
    return [...pemeliharaanContext.state.datas, ...keluhanContext.state.datas];
  }, [keluhanContext.state.datas, pemeliharaanContext.state.datas]);

  useEffect(() => {
    if (datas.length <= 0) refresh();
  }, []);

  const renderCard: ListRenderItem<any> = ({ item }) => {
    const isPreventif = 'id_pemeliharaan' in item;
    return (
      <VStack
        px='6' pb='4' mb='4'
        bg='white'
        space='md'
        borderBottomWidth={isPreventif ? '0' : '1'}
        borderColor='spars.darkgrey'>
        <HStack justifyContent='space-between' alignItems='center'>
          <Text bold fontSize='xs' color='spars.grey'>{
            isPreventif ? 
            moment(item.tgl_jadwal, 'YYYY-MM-DD').format('DD MMMM YYYY').toUpperCase() :
            item.tgl_masuk?.toUpperCase()
          }</Text>
          <Center
            bg={isPreventif ? 'spars.blue' : 'spars.green'}
            p='1' px='4'
            borderRadius='50'
            _text={{ fontSize: 'xs', color: 'white', letterSpacing: '1' }}>
            { isPreventif ? 'Preventif' : 'Korektif' }
          </Center>
        </HStack>
        { isPreventif ? (
          <ReportCardTeknisiPreventif
            mb='5'
            onPemeliharaan={() => goToDetailPemeliharaan(item)}
            onRiwayat={() => goToRiwayatPemeliharaan(item)}
            data={item} />
        ) : (
          <ReportCardTeknisiKorektif onPress={() => goToFormKeluhan(item)} data={item} />
        ) }
        { !isPreventif && (
          <HStack justifyContent='space-between'>
            <Text bold color='spars.green'>{ item.status?.toUpperCase() }</Text>
            <Pressable flexDirection='row' onPress={() => setRiwayatOpen(item)}>
              <Text bold>Lihat Riwayat</Text>
              <ChevronRightIcon size='sm' />
            </Pressable>
          </HStack>
        ) }
      </VStack>
    )
  }

  return (
    <Box flex={1} bg='white'>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={loading_refresh}
            onRefresh={refresh} />
        }
        data={datas}
        renderItem={renderCard}
        nestedScrollEnabled={true}
        contentContainerStyle={{
          borderTopStartRadius: 20,
          borderTopEndRadius: 20
        }}
        ListHeaderComponent={() =>
          <VStack bg='spars.green'>
            <GlassBg />
            <HStack space='md' p='6' justifyContent='flex-start' alignItems='center'>
              <Pressable onPress={goToReport} flexDir='row' justifyContent='flex-start' alignItems='center'>
                <Box>
                  <ChevronRightIcon size='md' color='white' />
                </Box>
                <Text bold color='white' fontSize='16'>Data Tugas</Text>
              </Pressable>
              <HStack flex='1' space='xs'>
              <Pressable
                flex='1'
                maxW='200'
                bg='spars.whitelight'
                pr='3'
                borderRadius='8'
                onPress={() => setShowDatepickerFilter(true)}>
                <Input
                  value={date_filter.format('DD/MM/YYYY')}
                  placeholder='Filter Tanggal'
                  variant='unstyled'
                  py='1' px='3'
                  outlineStyle='none'
                  color='white'
                  InputRightElement={<CalendarIcon color='white' size='sm' />}
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
                <Pressable
                  px='3'
                  justifyContent='center'
                  bg='spars.whitelight'
                  borderRadius='8'
                  onPress={authContext.logout}>
                  <CloseIcon size='xs' color='white' />
                </Pressable>
              </HStack>
            </HStack>
            <Box h='8' bg='white' borderTopRadius='20' />
          </VStack>
        } />

      <Actionsheet isOpen={!!riwayatOpen} onClose={() => setRiwayatOpen(undefined)}>
        <Actionsheet.Content>
          <ScrollView width="100%">
            <HStack py='5' mx='5' justifyContent='space-between' borderBottomWidth='1' borderColor='#DEDEDE'>
              <Text color='spars.grey' fontSize='16'>Proses</Text>
              <Text bold>{ getOrDash(riwayatOpen?.tgl_masuk) }</Text>
            </HStack>
            <HStack py='5' mx='5' justifyContent='space-between' borderBottomWidth='1' borderColor='#DEDEDE'>
              <Text color='spars.grey' fontSize='16'>Approval</Text>
              <Text bold>{ getOrDash(riwayatOpen?.tgl_approval_katim) }</Text>
            </HStack>
            <HStack py='5' mx='5' justifyContent='space-between' borderBottomWidth='1' borderColor='#DEDEDE'>
              <Text color='spars.grey' fontSize='16'>Selesai</Text>
              <Text bold>{ getOrDash(riwayatOpen?.tgl_penanganan_teknisi) }</Text>
            </HStack>
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
}

export default DataTugas;