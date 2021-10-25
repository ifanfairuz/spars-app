import React, { FC, useContext, useMemo, useState } from 'react';
import { HStack, Text, VStack, Pressable, ArrowBackIcon, ChevronDownIcon, ChevronRightIcon, Box, FlatList, Actionsheet, ScrollView, Select } from 'native-base';
import { GlassBg, ReportCardKatim } from '@components';
import { ListRenderItem, RefreshControl } from 'react-native';
import { KatimScreenProps } from '.';
import KeluhanKatimContext from '@context/keluhan/KeluhanKatimContext';
import Keluhan from '@store/models/Keluhan';

export type DetailReportKeluhanProps = KatimScreenProps<'DetailReportKeluhan'>;

const DetailReportKeluhan: FC<DetailReportKeluhanProps> = ({ navigation }) => {
  const keluhanContext = useContext(KeluhanKatimContext);
  const [riwayatOpen, setRiwayatOpen] = useState(false);
  const goBack = () => navigation.canGoBack() && navigation.goBack();

  const loading_refresh = useMemo(() => keluhanContext.state.loading, [keluhanContext.state.loading]);
  const refresh = () => {
    keluhanContext.init();
  }

  const [filterStatus, setFilterStatus] = useState('');
  const datas = useMemo(() => {
    const d = keluhanContext.state.datas;
    return filterStatus && filterStatus != '' ? d.filter(k => k.status === filterStatus) : d;
  }, [filterStatus, keluhanContext.state.datas]);

  const renderReport: ListRenderItem<Keluhan> = ({ item }) => {
    return (
      <VStack
        px='6' pb='4' mb='4'
        bg='white'
        space='md'
        borderBottomWidth='1'
        borderColor='spars.darkgrey'>
        <ReportCardKatim data={item} />
        <HStack justifyContent='space-between'>
          <Text bold color='spars.green'>{ (item.status || '').toUpperCase() }</Text>
          <Pressable flexDirection='row' onPress={() => setRiwayatOpen(true)}>
            <Text bold>Lihat Riwayat</Text>
            <ChevronRightIcon size='sm' />
          </Pressable>
        </HStack>
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
        renderItem={renderReport}
        nestedScrollEnabled={true}
        contentContainerStyle={{
          borderTopStartRadius: 20,
          borderTopEndRadius: 20
        }}
        ListHeaderComponent={() =>
          <VStack bg='spars.green'>
            <GlassBg />
            <HStack space='md' p='6' justifyContent='flex-start' alignItems='center'>
              <Pressable p='2' onPress={goBack}>
                <ArrowBackIcon size='6' color='white' />
              </Pressable>
              <Text bold color='white' fontSize='16'>Report</Text>
            </HStack>
            <VStack py='5' px='6' bg='white' borderTopRadius='20'>
              <Box borderRadius='9' bg='white' shadow='5'>
                <Select
                  selectedValue={filterStatus}
                  onValueChange={setFilterStatus}
                  variant='unstyled'
                  borderWidth='0'
                  px='5'
                  placeholder='Filter Status'
                  dropdownIcon={<ChevronDownIcon size='sm' mr='3' />}>
                  <Select.Item value='Selesai' label='Selesai' />
                  <Select.Item value='Belum Selesai' label='Belum Selesai' />
                  <Select.Item value='Selesai Dengan Syarat / Sparepart' label='Selesai Dengan Syarat / Sparepart' />
                  <Select.Item value='Belum ditangani' label='Belum ditangani' />
                  <Select.Item value='Moving' label='Moving' />
                </Select>
              </Box>
            </VStack>
          </VStack>
        } />

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
    </Box>
  );
}

export default DetailReportKeluhan;