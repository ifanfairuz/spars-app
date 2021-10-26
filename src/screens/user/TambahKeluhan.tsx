import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { VStack, ScrollView, Select, Box, HStack, Input, TextArea, Text, Button, ChevronDownIcon, CircleIcon } from 'native-base';
import { ButtonScan, Loader, TakePhoto } from '@components';
import { UserScreenProps } from '.';
import KeluhanUserContext from '@context/keluhan/KeluhanUserContext';
import Alat from '@store/models/Alat';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';
import { Dimensions } from 'react-native';
import { Asset } from 'react-native-image-picker';
import { imageAssetToBase64Uri } from '@support/helpers/image';

export type TambahKeluhanProps = UserScreenProps<'TambahKeluhan'>;

const TambahKeluhan: FC<TambahKeluhanProps> = ({ navigation, route }) => {
  const keluhanContext = useContext(KeluhanUserContext);
  const [alats, setAlats] = useState({
    current: 1,
    page: 0,
    data: [] as Alat[]
  });
  const [loading, setLoading] = useState(false);
  const [alats_loading, setAlatsLoading] = useState(false);
  const [alat, setAlat] = useState<Alat|undefined>(undefined);
  const [insiden, setInsiden] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [images, setImages] = useState<Asset[]>([]);

  const getAlatByCode = (code: string) => {
    keluhanContext.getAlat(code, alats.current, false)
    .then(res => {
      setAlat(res.data.shift())
    });
  }

  const getAlatByKey = (key: string) => {
    if (!alats_loading) setAlatsLoading(true);
    keluhanContext.getAlat(key, alats.current, true)
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

  const goToMain = () => navigation.popToTop();
  const goToTakeBarcode = () => navigation.navigate('TakeBarcode', {
    onRead: ({ data }, nav) => {
      getAlatByCode(data);
      nav.goBack();
    }
  });

  const submit = () => {
    if (!alat) return;
    setLoading(true);
    const photos = images.map(i => i.base64 || '');
    keluhanContext.tambahKeluhan(alat.id_alat, alat.no_seri, insiden, deskripsi, photos)
    .then(success => {
      success && goToMain();
    })
    .finally(() => setLoading(false));
  }

  const alats_list = useMemo(() => alats.data.map(a => ({ id: a.id_alat, title: a.nama_alat, data: a })), [alats]);
  const images_list = useMemo(() => images.map(i => i.uri || ''), [images]);

  useEffect(() => {
    if (route.params?.code) {
      getAlatByCode(route.params.code);
      navigation.setParams({ code: undefined });
    }
  }, []);
  
  return (
    <Box flex='1' bg='white'>
      <Loader show={loading} />
      <ScrollView>
        <VStack p='5' space='md'>

          <HStack borderWidth='1' borderRadius='8' borderColor='spars.darkgrey' p='0' bg='spars.lightgrey' position='relative' zIndex={2}>
            <AutocompleteDropdown
              dataSet={alats_list}
              onChangeText={key => getAlatByKey(key)}
              onSelectItem={(item: { id: string, title: string, data: Alat }) => setAlat(item?.data)}
              debounce={600}
              suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
              loading={alats_loading}
              clearOnFocus={false}
              useFilter={false}
              textInputProps={{
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
              showClear={false}
              showChevron={false} />
            <Box justifyContent='center' alignItems='center' px='2' py='1' bg='white' borderRightRadius='8'>
              <ButtonScan p='3' imageProps={{ size: 5 }} onPress={goToTakeBarcode} />
            </Box>
          </HStack>

          <VStack space='md' position='relative' zIndex={1}>
            <Input placeholder='Ruangan A1' isDisabled={true} value={alat?.nama_ruangan} />

            <Input placeholder='NS12039103' isDisabled={true} value={alat?.no_seri} />

            <Select placeholder='KTC' selectedValue={insiden} onValueChange={setInsiden}>
              <Select.Item label="KTC" value="KTC" />
              <Select.Item label="KND" value="KND" />
              <Select.Item label="KNC" value="KNC" />
            </Select>

            <TextArea h={40} placeholder='Deskripsikan keluhan' textAlignVertical='top' value={deskripsi} onChangeText={setDeskripsi} />

            <TakePhoto
              values={images_list}
              onAdd={datas => {
                const data = datas.filter(d => d.uri && d.base64);
                setImages([
                  ...images,
                  ...data
                ]);
              }}
              onRemove={i => {
                images.splice(i, 1);
                setImages([...images]);
              }} />

            <Button
              py={5}
              size='lg'
              bg='spars.orange'
              shadow='9.orange'
              _text={{ color: 'white' }}
              _pressed={{ bg: 'spars.orange', opacity: 0.8 }}
              onPress={submit}>
              Tambah Keluhan
            </Button>
          </VStack>

        </VStack>
      </ScrollView>
    </Box>
  );
}

export default TambahKeluhan;