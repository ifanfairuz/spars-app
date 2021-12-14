import React, { FC, useContext, useMemo, useState } from 'react';
import {
  VStack, ScrollView, HStack, Text, Pressable,
  Button, ArrowBackIcon, Select, ChevronDownIcon,
  Radio, Input, TextArea, CircleIcon, Box,
  CloseIcon, Divider, Toast
} from 'native-base';
import DateTimePicker, { AndroidEvent } from '@react-native-community/datetimepicker';
import { GlassBg, CalendarIcon, ButtonScan, ChooseDocument, Loader } from '@components';
import { KatimScreenProps } from '.';
import { Dimensions } from 'react-native';
import moment, { Moment } from 'moment';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Alat from '@store/models/Alat';
import PemeliharaanKatimContext from '@context/pemeliharaan/PemeliharaanKatimContext';
import { File } from '@support/http/contract/Params';


export type TambahPenjadwalanProps = KatimScreenProps<'TambahPenjadwalan'>;

type OptionAlat = { id: string, title: string, data: Alat }
const TambahPenjadwalan: FC<TambahPenjadwalanProps> = ({ navigation }) => {
  const pemeliharaanContext = useContext(PemeliharaanKatimContext);

  const [loading, setLoading] = useState(false);
  const [head_height, setHeadHeight] = useState(0);
  const [selected_alats, setSelectedAlats] = useState<Alat[]>([]);
  const [tipe_pemeliharaan, setTipePemeliharaan] = useState('');
  const [interval, setInterval] = useState('manual');
  const [interval_day, setIntervalDay] = useState(1);
  const [teknisi, setTeknisi] = useState('');
  const [start_date, setStartDate] = useState<Moment|undefined>();
  const [end_date, setEndDate] = useState<Moment|undefined>();
  const [show_datepicker_start, setShowDatepickerStart] = useState(false);
  const [show_datepicker_end, setShowDatepickerEnd] = useState(false);
  const [catatan, setCatatan] = useState('');
  const [dokuments, setDokuments] = useState<File[]>([]);
  const goBack = () => navigation.canGoBack() && navigation.goBack();
  const goToMain = () => navigation.replace('DetailReportPemeliharaan');

  let autoCompleteController = {
    close: () => {},
    open: async () => {},
    toggle: () => {},
    clear: () => {},
    setInputText: (text: string) => {}
  }
  const selected_alat_ids = useMemo(() => selected_alats.map(a => a.id_alat_detail), [selected_alats]);
  const addSelectedAlats = (alat: Alat) => {
    if (alat && !selected_alat_ids.includes(alat.id_alat_detail)) {
      setSelectedAlats([ ...selected_alats, alat ]);
    }
    autoCompleteController.clear();
  }
  const removeSelectedAlats = (index: number) => {
    const new_state = [...selected_alats];
    new_state.splice(index, 1);
    setSelectedAlats(new_state);
  }

  const [alats, setAlats] = useState({
    current: 1,
    page: 0,
    data: [] as OptionAlat[]
  });
  const [loading_alat_bycode, setLoadingAlatByCode] = useState(false);
  const [alats_loading, setAlatsLoading] = useState(false);

  const genOptionAlat = (alat: Alat) => ({
    id: alat.id_alat,
    title: `${alat.nama_alat} | ${alat.no_seri}`,
    data: alat
  }) as OptionAlat

  const getAlatByCode = (code: string) => {
    setLoadingAlatByCode(true);
    return pemeliharaanContext.getAlat(code, alats.current, false)
    .then(res => {
      const data = res.data.shift();
      if (data) {
        setAlats({
          ...alats,
          current: 1,
          data: [genOptionAlat(data)]
        });
      }
      setLoadingAlatByCode(false);
    })
    .catch(() => {
      setLoadingAlatByCode(false);
    });
  }

  const getAlatByKey = (key: string) => {
    if (!alats_loading) setAlatsLoading(true);
    pemeliharaanContext.getAlat(key, alats.current, true)
    .then(res => {
      const res_options = res.toDataOptionsAlat(genOptionAlat);
      if (alats.page == res_options.page && alats.current+1 == res_options.current) {
        setAlats({
          ...alats,
          current: res_options.current,
          data: [...alats.data, ...res_options.data]
        });
      } else setAlats(res_options);
    })
    .finally(() => setAlatsLoading(false));
  }

  const goToTakeBarcode = () => navigation.navigate('TakeBarcode', {
    onRead: ({ data }, nav) => {
      getAlatByCode(data);
      nav.goBack();
    }
  });

  const genParams = () => {
    if (tipe_pemeliharaan == '') {
      Toast.show({ title: `Tipe Pemeliharaan tidak boleh kosong`, status: 'error'  });
      return false;
    }
    if (selected_alat_ids.length <= 0) {
      Toast.show({ title: `Setidaknya pilih satu alat`, status: 'error'  });
      return false;
    }
    if (teknisi == '') {
      Toast.show({ title: `Teknisi tidak boleh kosong`, status: 'error'  });
      return false;
    }
    if (!['auto', 'manual'].includes(interval)) {
      Toast.show({ title: `Interval tidak valid`, status: 'error'  });
      return false;
    }
    if ((!['auto', 'manual'].includes(interval)) || (interval == 'manual' && interval_day <= 0)) {
      Toast.show({ title: `Interval tidak valid`, status: 'error'  });
      return false;
    }
    if (!start_date || start_date.isBefore(moment(), 'day')) {
      Toast.show({ title: `Tanggal Mulai tidak valid`, status: 'error'  });
      return false;
    }
    if (!end_date || end_date.isBefore(start_date)) {
      Toast.show({ title: `Tanggal Akhir tidak valid`, status: 'error'  });
      return false;
    }
    
    return {
      tipe_pemeliharaan: tipe_pemeliharaan,
      id_alat_detail: [...selected_alat_ids].map(a => ({ id_alat_detail: `${a}` })),
      id_teknisi: teknisi,
      interval: interval,
      interval_day: interval == 'manual' ? interval_day : 0,
      str_date: start_date.format('YYYY-MM-DD'),
      end_date: end_date.format('YYYY-MM-DD'),
      catatan_katim: catatan,
      berkas_1: dokuments.length > 0 ? dokuments[0] : undefined,
      berkas_2: dokuments.length > 1 ? dokuments[1] : undefined,
      berkas_3: dokuments.length > 2 ? dokuments[2] : undefined,
    }
  }

  const submit = () => {
    const params = genParams();
    if (params) {
      setLoading(true);
      pemeliharaanContext.tambahPemeliharaan(params)
      .then((success) => {
        if (success) {
          Toast.show({ title: `Success tambah jadwal pemeliharaan`, status: 'success' });
          goToMain();
        }
      })
      .finally(() => {
        setLoading(false);
      })
    }
  }

  return (
    <VStack flex={1} bg='spars.green' position='relative'>
      <Loader show={loading} />
      <GlassBg h='70%' />
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
        }}>
        <HStack py='8' justifyContent='center' alignItems='center' onLayout={e => setHeadHeight(e.nativeEvent.layout.height)}>
          <Text bold color='white' fontSize='16'>Tambah Penjadwalan</Text>
          <Pressable position='absolute' left='6' p='2' onPress={goBack}>
            <ArrowBackIcon size='6' color='white' />
          </Pressable>
        </HStack>
        
        <VStack space='md' px='5' py='6' bg='white' borderTopRadius='20' minH={Dimensions.get('window').height - 20 - head_height}>

          <HStack borderWidth='1' borderRadius='8' borderColor='spars.darkgrey' p='0' bg='spars.lightgrey' position='relative' zIndex={2}>
            <AutocompleteDropdown
              controller={(c) => autoCompleteController = c}
              dataSet={alats.data}
              onChangeText={key => getAlatByKey(key)}
              onSelectItem={(item: { id: string, title: string, data: Alat }) => addSelectedAlats(item?.data)}
              debounce={600}
              suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
              loading={alats_loading || loading_alat_bycode}
              clearOnFocus={true}
              useFilter={false}
              textInputProps={{
                selectTextOnFocus: true,
                placeholder: "Hematology Analys",
                placeholderTextColor: '#9E9E9E',
                autoCorrect: false,
                autoCapitalize: "none",
                style: {
                  backgroundColor: "transparent",
                  color: "#000",
                  shadow: 'none'
                }
              }}
              rightButtonsContainerStyle={{
                alignSelf: "center",
                backgroundColor: "transparent"
              }}
              suggestionsListContainerStyle={{
                backgroundColor: "#ffffff",
                zIndex: 2,
              }}
              containerStyle={{ flexGrow: 1, flexShrink: 1, justifyContent: 'center' }}
              ChevronIconComponent={<CircleIcon size='sm' color='grey' />}
              ClearIconComponent={<ChevronDownIcon size='sm' color='grey' />}
              showClear={true}
              showChevron={false} />
            <Box justifyContent='center' alignItems='center' px='2' py='1' bg='white' borderRightRadius='8'>
              <ButtonScan p='3' imageProps={{ size: 5 }} onPress={goToTakeBarcode} />
            </Box>
          </HStack>

          <VStack bg='spars.lightgrey' py='3' px='4' borderWidth='1' borderStyle='dashed' borderRadius='8' borderColor='spars.darkgrey'>
              { [...selected_alats].map((a, i) => (
                <HStack
                  key={a.id_alat_detail}
                  py='2'
                  justifyContent='space-between'
                  alignItems='center'
                  space={2}
                  divider={<Divider />}>
                    <Text flex='1'>{ `${a.nama_alat} | ${a.no_seri}` }</Text>
                    <Pressable w='4' onPress={() => removeSelectedAlats(i)}>
                      <CloseIcon size='3' />
                    </Pressable>
                </HStack>
              )) }
              { selected_alats.length == 0 && (
                <HStack py='2' justifyContent='center'>
                    <Text>Tidak ada alat terpilih.</Text>
                </HStack>
              )}
          </VStack>

          <Select
            p='5'
            placeholder='Pilih Tipe Pemeliharaan'
            accessibilityLabel='Pilih Tipe Pemeliharaan'
            outlineStyle='none'
            borderStyle='dashed'
            selectedValue={tipe_pemeliharaan}
            onValueChange={setTipePemeliharaan}
            dropdownIcon={<ChevronDownIcon size='6' color='spars.grey' mr='4' />}>
            <Select.Item value='Kelistrikan' label='Kelistrikan' />
            <Select.Item value='Peforma' label='Peforma' />
            <Select.Item value='Fisik' label='Fisik' />
            <Select.Item value='Medis' label='Medis' />
          </Select>
          <Select
            p='5'
            placeholder='Pilih Teknisi'
            accessibilityLabel='Pilih Teknisi'
            outlineStyle='none'
            borderStyle='dashed'
            selectedValue={teknisi}
            onValueChange={setTeknisi}
            dropdownIcon={<ChevronDownIcon size='6' color='spars.grey' mr='4' />}>
            <Select.Item value='USR/21/10/00004' label='Arif Ragil P' />
          </Select>
          <VStack space='md'>
            <Text bold>Interval</Text>
            <VStack space='sm'>
              <Radio.Group
                flexDirection='row'
                name="interval"
                accessibilityLabel="interval"
                value={interval}
                onChange={v => {
                  if (v == 'auto') setIntervalDay(0);
                  else if (v == 'manual') setIntervalDay(1);
                  setInterval(v)
                }}>
                <Radio flex='1' alignItems='flex-start' value="manual" _text={{ fontSize: 'sm' }}>
                  Set Manual
                </Radio>
                <Radio flex='1' alignItems='flex-start' value="auto" _text={{ fontSize: 'sm' }}>
                  Sesuai Alat (auto)
                </Radio>
              </Radio.Group>
              { interval == 'manual' && (
                <Input
                  py='2' px='4'
                  maxW='50%'
                  placeholder='/Hari'
                  size='md'
                  fontWeight='400'
                  bg='white'
                  keyboardType='numeric'
                  value={interval_day.toString()}
                  onChangeText={v => setIntervalDay(parseInt(v))} />
              ) }
            </VStack>
          </VStack>
          <VStack space='md'>
            <Text bold>Diberlakukan</Text>
            <HStack space='sm'>
              <Pressable
                flex='1'
                onPress={() => setShowDatepickerStart(true)}>
                <Input
                  value={start_date?.format('DD/MM/YYYY')}
                  placeholder='Dari'
                  InputRightElement={<CalendarIcon size='sm' mr='3' />}
                  isReadOnly />
              </Pressable>
              <Pressable
                flex='1'
                onPress={() => setShowDatepickerEnd(true)}>
                <Input
                  value={end_date?.format('DD/MM/YYYY')}
                  placeholder='Sampai'
                  InputRightElement={<CalendarIcon size='sm' mr='3' />}
                  isReadOnly />
                </Pressable>
            </HStack>
            { show_datepicker_start && (
              <DateTimePicker
                testID="datePickerStrat"
                mode='date'
                is24Hour={true}
                display="default"
                value={start_date?.toDate() || new Date()}
                onChange={(e: AndroidEvent, date?: Date) => {
                  setShowDatepickerStart(false);
                  setStartDate(moment(date));
                }} />
            ) }
            { show_datepicker_end && (
              <DateTimePicker
                testID="datePickerEnd"
                mode='date'
                is24Hour={true}
                display="default"
                value={end_date?.toDate() || new Date()}
                onChange={(e: AndroidEvent, date?: Date) => {
                  setShowDatepickerEnd(false);
                  setEndDate(moment(date));
                }} />
            ) }
            <TextArea h={40} placeholder='Memo / Catatan' textAlignVertical='top' value={catatan} onChangeText={setCatatan} />
          </VStack>
          <ChooseDocument
            values={dokuments}
            onAdd={(data) => setDokuments(data)}
            onRemove={(index) => {
              const docs = [...dokuments];
              docs.splice(index, 1);
              setDokuments(docs);
            }} />

          <Button
            size='lg'
            p='4'
            bg='spars.orange'
            _text={{ color: 'white' }} shadow='9.orange'
            _pressed={{ bg: 'spars.orange', opacity: 0.8 }}
            onPress={submit}>
              Tambah Penjadwalan
          </Button>
        </VStack>
      </ScrollView>
    </VStack>
  );
}

export default TambahPenjadwalan;