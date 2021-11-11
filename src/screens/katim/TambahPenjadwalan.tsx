import React, { FC, useContext, useMemo, useState } from 'react';
import { VStack, ScrollView, HStack, Text, Pressable, Button, ArrowBackIcon, Select, ChevronDownIcon, Radio, Input, TextArea, Checkbox, CircleIcon, Box } from 'native-base';
import DateTimePicker, { AndroidEvent } from '@react-native-community/datetimepicker';
import { GlassBg, CalendarIcon, ButtonScan } from '@components';
import { KatimScreenProps } from '.';
import { Dimensions } from 'react-native';
import moment, { Moment } from 'moment';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import Alat from '@store/models/Alat';
import PemeliharaanKatimContext from '@context/pemeliharaan/PemeliharaanKatimContext';


export type TambahPenjadwalanProps = KatimScreenProps<'TambahPenjadwalan'>;

const TambahPenjadwalan: FC<TambahPenjadwalanProps> = ({ navigation }) => {
  const pemeliharaanContext = useContext(PemeliharaanKatimContext);

  const [head_height, setHeadHeight] = useState(0);
  const [interval, setInterval] = useState('manual');
  const [start_date, setStartDate] = useState<Moment|undefined>();
  const [end_date, setEndDate] = useState<Moment|undefined>();
  const [show_datepicker_start, setShowDatepickerStart] = useState(false);
  const [show_datepicker_end, setShowDatepickerEnd] = useState(false);
  const goBack = () => navigation.canGoBack() && navigation.goBack();
  const goToMain = () => navigation.replace('PilihAlat');

  const [alats, setAlats] = useState({
    current: 1,
    page: 0,
    data: [] as Alat[]
  });
  const [loading_alat_bycode, setLoadingAlatByCode] = useState(false);
  const [alats_loading, setAlatsLoading] = useState(false);

  const getAlatByCode = (code: string) => {
    setLoadingAlatByCode(true);
    return pemeliharaanContext.getAlat(code, alats.current, false)
    .then(res => {
      const data = res.data.shift();
      if (data) {
        setAlats({
          ...alats,
          current: 1,
          data: [data]
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
      if (alats.page == res.page && alats.current+1 == res.current) {
        setAlats({
          ...alats,
          current: res.current,
          data: [...alats.data, ...res.data]
        });
      } else setAlats(res);
    })
    .finally(() => setAlatsLoading(false));
  }

  const alats_list = useMemo(() => alats.data.map(a => ({ id: a.id_alat, title: `${a.nama_alat} | ${a.no_seri}`, data: a })), [alats]);

  const goToTakeBarcode = () => navigation.navigate('TakeBarcode', {
    onRead: ({ data }, nav) => {
      getAlatByCode(data);
      nav.goBack();
    }
  });

  const submit = () => {
    goToMain();
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
        <HStack py='8' justifyContent='center' alignItems='center' onLayout={e => setHeadHeight(e.nativeEvent.layout.height)}>
          <Text bold color='white' fontSize='16'>Tambah Penjadwalan</Text>
          <Pressable position='absolute' left='6' p='2' onPress={goBack}>
            <ArrowBackIcon size='6' color='white' />
          </Pressable>
        </HStack>
        
        <VStack space='md' px='5' py='6' bg='white' borderTopRadius='20' minH={Dimensions.get('window').height - 20 - head_height}>

          <HStack borderWidth='1' borderRadius='8' borderColor='spars.darkgrey' p='0' bg='spars.lightgrey' position='relative' zIndex={2}>
            <AutocompleteDropdown
              dataSet={alats_list}
              onChangeText={key => getAlatByKey(key)}
              // onSelectItem={(item: { id: string, title: string, data: Alat }) => setAlat(item?.data)}
              debounce={600}
              suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
              loading={alats_loading}
              clearOnFocus={false}
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

          <Select
            p='5'
            placeholder='Pilih Tipe Pemeliharaan'
            accessibilityLabel='Pilih Tipe Pemeliharaan'
            outlineStyle='none'
            borderStyle='dashed'
            dropdownIcon={<ChevronDownIcon size='6' color='spars.grey' mr='4' />}>
            <Select.Item value='08 January' label='08 January' />
            <Select.Item value='09 January' label='09 January' />
            <Select.Item value='10 January' label='10 January' />
          </Select>
          <Select
            p='5'
            placeholder='Pilih Teknisi'
            accessibilityLabel='Pilih Teknisi'
            outlineStyle='none'
            borderStyle='dashed'
            dropdownIcon={<ChevronDownIcon size='6' color='spars.grey' mr='4' />}>
            <Select.Item value='08 January' label='08 January' />
            <Select.Item value='09 January' label='09 January' />
            <Select.Item value='10 January' label='10 January' />
          </Select>
          <VStack space='md'>
            <Text bold>Interval</Text>
            <VStack space='sm'>
              <Radio.Group
                flexDirection='row'
                name="interval"
                accessibilityLabel="interval"
                value={interval}
                onChange={v => setInterval(v)}>
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
                  bg='white' />
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
            <TextArea h={40} placeholder='Memo / Catatan' textAlignVertical='top' />
          </VStack>
          <VStack space='md' mb='5'>
            <Text bold>Notifikasi</Text>
            <Checkbox.Group flexDirection='row'>
              <Checkbox flex='1' alignItems='flex-start' value='app'>Aplikasi</Checkbox>
              <Checkbox flex='1' alignItems='flex-start' value='email'>Email</Checkbox>
              <Checkbox flex='1' alignItems='flex-start' value='sms'>SMS</Checkbox>
            </Checkbox.Group>
          </VStack>

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