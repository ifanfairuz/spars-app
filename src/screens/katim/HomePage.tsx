import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { Box, HStack, Image, ScrollView, Input, Text, VStack, Stack, Pressable, ArrowForwardIcon, FlatList, Modal, Button, TextArea, CloseIcon } from 'native-base';
import { CalendarIcon, GlassBg, KeluhanKatim } from '@components';
import { Dimensions, ListRenderItem, RefreshControl } from 'react-native';
import { gradient } from '@config/native-base';
import { KatimScreenProps } from '.';
import AuthContext from '@context/AuthContext';
import { imageProfile } from '@support/helpers/image';
import KeluhanKatimContext from '@context/keluhan/KeluhanKatimContext';
import Keluhan from '@store/models/Keluhan';
import moment, { Moment } from 'moment';
import { validatePersentase } from '@support/helpers/string';
import PemeliharaanKatimContext from '@context/pemeliharaan/PemeliharaanKatimContext';
import DateTimePicker, { AndroidEvent } from '@react-native-community/datetimepicker';

export type HomePageProps = KatimScreenProps<'HomePage'>;

const HomePage: FC<HomePageProps> = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  const keluhanContext = useContext(KeluhanKatimContext);
  const pemeliharaanContext = useContext(PemeliharaanKatimContext);
  const [head_height, setHeadHeight] = useState(0);
  const [date_filter, setDateFilter] = useState(moment());
  const [show_datepicker_filter, setShowDatepickerFilter] = useState(false);
  const goToTerima = (data: Keluhan) => navigation.navigate('PilihTeknisi', { data });
  const goToTambahJadwal = () => navigation.navigate('TambahPenjadwalan');
  const goToReportKeluhan = () => navigation.navigate('DetailReportKeluhan');
  const goToReportPemeliharaan = () => navigation.navigate('DetailReportPemeliharaan');
  const goDetailKeluhan = (data: Keluhan) => navigation.navigate('DetailKeluhan', { data });

  const [prepareKeluhanDecline, setPrepareKeluhanDecline] = useState<Keluhan|undefined>(undefined);
  const [reasonKeluhanDecline, setReasonKeluhanDecline] = useState('');
  const tolakKeluhan = () => {

    setReasonKeluhanDecline('');
    setPrepareKeluhanDecline(undefined);
  }

  const loading_refresh = useMemo(() => keluhanContext.state.loading || pemeliharaanContext.state.loading, [keluhanContext.state.loading, pemeliharaanContext.state.loading]);
  const refresh = () => {
    keluhanContext.init(date_filter.format('MMYYYY'));
    pemeliharaanContext.getPemeliharaan(date_filter);
  }

  const filterDashboard = (date: Moment) => {
    keluhanContext.getDashboard(date.format('MMYYYY'));
    pemeliharaanContext.getPemeliharaan(date);
  }
  
  const user = useMemo(() => authContext.state.user, [authContext]);
  const dashboard = useMemo(() => keluhanContext.state.dashboard, [keluhanContext.state.dashboard]);
  const keluhanBaru = useMemo(() => keluhanContext.state.datas /*.slice(0, 5)*/, [keluhanContext.state.datas]);
  const pemeliharaan_count = useMemo(() => pemeliharaanContext.state.datas/*.map(d => d.id_pemeliharaan).filter((d, i, a) => a.indexOf(d) == i)*/ .length, [pemeliharaanContext.state.datas]);

  useEffect(() => {
    if (keluhanContext.state.datas.length <= 0) refresh();
  }, []);

  const renderKeluhan: ListRenderItem<Keluhan> = ({ item }) => {
    return (
      <KeluhanKatim
        mr='3' data={item}
        goDetail={() => goDetailKeluhan(item)}
        onAccept={() => goToTerima(item)}
        onDecline={() => setPrepareKeluhanDecline(item)} />
    )
  }
  
  return (
    <VStack flex={1} bg='spars.green' position='relative'>
      <GlassBg h='70%' />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading_refresh}
            onRefresh={refresh} />
        }
        nestedScrollEnabled={true}
        contentContainerStyle={{
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
        }}>
        <VStack p='5' space='md' onLayout={e => setHeadHeight(e.nativeEvent.layout.height)}>
          <HStack justifyContent='space-between'>
            <HStack space='xs' alignItems='center'>
              <Box p='1' bg='white' borderRadius='100'>
                <Image size='xs' borderRadius='100' src={imageProfile(user?.foto)} alt='profile' />
              </Box>
              <VStack>
                <Text color='white' bold fontSize='lg' lineHeight='xs'>{ user?.nama_rumah_sakit }</Text>
                <Text color='white' fontSize='md' lineHeight='xs'>{ user?.full_name }</Text>
              </VStack>
            </HStack>
            <Pressable
              px='3'
              justifyContent='center'
              borderRadius='8'
              onPress={authContext.logout}>
              <CloseIcon size='xs' color='white' />
            </Pressable>
          </HStack>
          <HStack justifyContent='space-between' alignItems='center'>
            <Text bold color='white'>OVERVIEW</Text>
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
                  filterDashboard(d);
                }} />
            ) }
          </HStack>
          <VStack py='5' bg='white' borderRadius='8'>
            
            <Pressable onPress={goToReportKeluhan}>
              <HStack px='5' space='md'>
                <VStack flex='1' space='xs'>
                  <HStack justifyContent='space-between' alignItems='baseline'>
                    <Text fontSize='md'>Pemeliharaan</Text>
                    <Text fontSize='sm' color='spars.grey' bold>16</Text>
                  </HStack>
                  <Box bg='spars.darkgrey' h='1' borderRadius='4'>
                    <Box position='absolute' borderRadius='4' h='1' w='90%' bg='spars.orange' />
                  </Box>
                  <Text fontSize='sm' color='spars.green2' bold>12 Selesai</Text>
                </VStack>
                <Stack justifyContent='center'>
                  <Box w='50' h='50' bg={gradient.orange} borderRadius='8' justifyContent='center' alignItems='center'>
                    <Text fontSize='sm' bold color='white'>90%</Text>
                  </Box>
                </Stack>
              </HStack>
            </Pressable>
            <Box my='4' w='100%' borderWidth='1' borderColor='spars.darkgrey' borderStyle='dashed' />
            <Pressable onPress={goToReportKeluhan}>
              <HStack px='5' space='md'>
                <VStack flex='1' space='xs'>
                  <HStack justifyContent='space-between' alignItems='baseline'>
                    <Text fontSize='md'>Keluhan</Text>
                    <Text fontSize='sm' color='spars.grey' bold>{ dashboard?.keluhan?.kel_total }</Text>
                  </HStack>
                  <Box bg='spars.darkgrey' h='1' borderRadius='4'>
                    <Box position='absolute' borderRadius='4' h='1' w={`${validatePersentase(dashboard?.keluhan?.persentase)}`} bg='spars.blue' />
                  </Box>
                  <Text fontSize='sm' color='spars.green2' bold>{ dashboard?.keluhan?.kel_selesai } Selesai</Text>
                </VStack>
                <Stack justifyContent='center'>
                  <Box w='50' h='50' bg={gradient.blue} borderRadius='8' justifyContent='center' alignItems='center'>
                    <Text fontSize='sm' bold color='white'>{ validatePersentase(dashboard?.keluhan?.persentase) }</Text>
                  </Box>
                </Stack>
              </HStack>
            </Pressable>

          </VStack>
        </VStack>
        
        <VStack pt='8' pb='2' bg='white' borderTopRadius='20' minH={Dimensions.get('window').height - head_height}>
          <VStack px='5' mb='2' space='xs'>
            <HStack justifyContent='space-between'>
              <Text bold fontSize='md'>Pemeliharaan</Text>
              <Pressable onPress={goToTambahJadwal}>
                <Text>Buat Jadwal</Text>
              </Pressable>
            </HStack>
            <HStack borderWidth='1' borderColor='spars.lightergrey' pl='4' pr='2' py='2' justifyContent='space-between' alignItems='center' my='2'>
              <Text>Terjadwal { pemeliharaan_count || '0' } Pemeliharaan</Text>
              <Pressable onPress={goToReportPemeliharaan}>
                <Box py='2' px='4' bg={gradient.blue} borderRadius='5'>
                  <Text bold color='white' fontSize='xs'>VIEW</Text>
                </Box>
              </Pressable>
            </HStack>
          </VStack>

          <VStack>
            <HStack px='5' justifyContent='space-between'>
              <Text bold fontSize='md'>Keluhan Baru</Text>
              <Pressable>
                <ArrowForwardIcon size='sm' color='spars.red' />
              </Pressable>
            </HStack>
            <FlatList
              data={keluhanBaru}
              renderItem={renderKeluhan}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 20, paddingLeft: 20, paddingRight: 10 }} />
          </VStack>
        </VStack>
      </ScrollView>
      <Modal
        isOpen={!!prepareKeluhanDecline}
        onClose={() => {
          setReasonKeluhanDecline('');
          setPrepareKeluhanDecline(undefined);
        }}
        avoidKeyboard
        justifyContent="flex-end"
        bottom="4"
        size="lg">
        <Modal.Content style={{ marginTop: '10%', marginBottom: 'auto' }}>
          <Modal.CloseButton />
          <Modal.Header>Tolak Keluhan</Modal.Header>
          <Modal.Body>
            <TextArea h={40} _focus={{ borderColor: 'spars.grey' }} placeholder='Alasan Keluhan' textAlignVertical='top' value={reasonKeluhanDecline} onChangeText={setReasonKeluhanDecline} />
          </Modal.Body>
          <Modal.Footer>
            <Button
              flex='1' 
              variant='outline'
              borderColor='spars.grey' _text={{ color: 'spars.grey' }}
              _pressed={{ bg: 'white', opacity: 0.8, borderColor: 'spars.grey' }}
              onPress={tolakKeluhan}>
              Tolak
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </VStack>
  );
}

export default HomePage;