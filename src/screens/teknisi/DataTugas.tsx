import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { HStack, Text, VStack, Pressable, ChevronRightIcon, Box, FlatList, Actionsheet, ScrollView, Select, ChevronDownIcon, Center, CloseIcon } from 'native-base';
import { GlassBg, ReportCardTeknisiKorektif, ReportCardTeknisiPreventif } from '@components';
import { ListRenderItem, RefreshControl } from 'react-native';
import { TeknisiScreenProps } from '.';
import KeluhanTeknisiContext from '@context/keluhan/KeluhanTeknisiContext';
import Keluhan from '@store/models/Keluhan';
import AuthContext from '@context/AuthContext';
import { getOrDash } from '@support/helpers/string';

export type DataTugasProps = TeknisiScreenProps<'DataTugas'>;

const DataTugas: FC<DataTugasProps> = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const keluhanContext = useContext(KeluhanTeknisiContext);
  const [riwayatOpen, setRiwayatOpen] = useState<Keluhan|undefined>(undefined);
  const goToFormPemeliharaan = () => navigation.navigate('FormPemeliharaan');
  const goToReport = () => navigation.navigate('Report');
  const goToFormKeluhan = (data: Keluhan) => navigation.navigate('DetailKeluhan', { data });

  const loading_refresh = useMemo(() => keluhanContext.state.loading, [keluhanContext.state.loading]);
  const refresh = () => {
    keluhanContext.init();
  }

  const datas = useMemo(() => {
    const d = [...keluhanContext.state.datas];
    return d;
  }, [keluhanContext.state.datas]);

  useEffect(() => {
    if (datas.length <= 0) refresh();
  }, []);

  const renderCard: ListRenderItem<Keluhan> = ({ item }) => {
    const isPreventif = !item.id_keluhan;
    return (
      <VStack
        px='6' pb='4' mb='4'
        bg='white'
        space='md'
        borderBottomWidth={isPreventif ? '0' : '1'}
        borderColor='spars.darkgrey'>
        <HStack justifyContent='space-between' alignItems='center'>
          <Text bold fontSize='xs' color='spars.grey'>{ item.tgl_masuk?.toUpperCase() }</Text>
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
            onPemeliharaan={goToFormPemeliharaan}
            onRiwayat={() => setRiwayatOpen(item)} />
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
                <Select
                  ml='auto'
                  placeholder='Filter Tanggal'
                  placeholderTextColor='white'
                  accessibilityLabel='Filter Tanggal'
                  outlineStyle='none'
                  variant='unstyled'
                  maxW='150'
                  flex='1'
                  py='1' px='3'
                  borderWidth='0'
                  bg='spars.whitelight'
                  color='white'
                  dropdownIcon={<ChevronDownIcon size='6' color='white' mr='1' />}>
                  <Select.Item value='08 January' label='08 January' />
                  <Select.Item value='09 January' label='09 January' />
                  <Select.Item value='10 January' label='10 January' />
                </Select>
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