import React, { FC, useState } from 'react';
import { HStack, Text, VStack, Pressable, ChevronRightIcon, Box, FlatList, Actionsheet, ScrollView, Select, ChevronDownIcon, Center } from 'native-base';
import { GlassBg, ReportCardTeknisiKorektif, ReportCardTeknisiPreventif } from '@components';
import { ListRenderItem } from 'react-native';
import { TeknisiScreenProps } from '.';

export type DataTugasProps = TeknisiScreenProps<'DataTugas'>;

const DataTugas: FC<DataTugasProps> = ({ navigation }) => {
  const [riwayatOpen, setRiwayatOpen] = useState(false);
  const goToFormPemeliharaan = () => navigation.navigate('FormPemeliharaan');
  const goToFormKeluhan = () => navigation.navigate('DetailKeluhan');

  const renderReport: ListRenderItem<number> = ({ index }) => {
    const isPreventif = index % 2 == 0;
    return (
      <VStack
        px='6' pb='4' mb='4'
        bg='white'
        space='md'
        borderBottomWidth={isPreventif ? '0' : '1'}
        borderColor='spars.darkgrey'>
        <HStack justifyContent='space-between' alignItems='center'>
          <Text bold fontSize='xs' color='spars.grey'>17 JANUARI 2020</Text>
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
            onRiwayat={() => setRiwayatOpen(true)} />
        ) : (
          <ReportCardTeknisiKorektif onPress={goToFormKeluhan} />
        ) }
        { !isPreventif && (
          <HStack justifyContent='space-between'>
            <Text bold color='spars.green'>SELESAI</Text>
            <Pressable flexDirection='row' onPress={() => setRiwayatOpen(true)}>
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
        data={[0,1,2,3,4,5,6,7,8,9]}
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
              <Box>
                <ChevronRightIcon size='md' color='white' />
              </Box>
              <Text bold color='white' fontSize='16'>Data Tugas</Text>
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
            </HStack>
            <Box h='8' bg='white' borderTopRadius='20' />
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

export default DataTugas;