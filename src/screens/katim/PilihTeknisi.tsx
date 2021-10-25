import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { HStack, ScrollView, Text, VStack, Pressable, ArrowBackIcon, Box, Button, Radio, Toast } from 'native-base';
import { GlassBg, Loader } from '@components';
import { Dimensions, RefreshControl } from 'react-native';
import { KatimScreenProps } from '.';
import KeluhanKatimContext from '@context/keluhan/KeluhanKatimContext';
import Teknisi from '@store/models/Teknisi';

export type PilihTeknisiProps = KatimScreenProps<'PilihTeknisi'>;

const PilihTeknisi: FC<PilihTeknisiProps> = ({ navigation, route }) => {
  const data = useMemo(() => route.params.data, [route.params]);
  const keluhanContext = useContext(KeluhanKatimContext);
  const [head_height, setHeadHeight] = useState(0);
  const goBack = () => navigation.canGoBack() && navigation.goBack();
  const goToMain = () => navigation.replace('DetailReportKeluhan');

  const [loading, setLoading] = useState(false);
  const [datas, setDatas] = useState<Teknisi[]>([]);
  const [teknisi, setTeknisi] = useState('');
  const refresh = () => {
    setLoading(true);
    keluhanContext.getTeknisi()
    .then(datas => setDatas(datas))
    .finally(() => setLoading(false));
  }

  const submit = () => {
    if (teknisi == '') {
      Toast.show({ title: 'Pilih teknisi terlebih dahulu', status: 'error', placement: 'top' });
      return;
    }
    keluhanContext.approveKeluhan(data.id_keluhan, teknisi)
    .then(success => {
      if (success) {
        goToMain();
        keluhanContext.getKeluhan();
      }
    })
  }

  useEffect(() => {
    if (datas.length <= 0) refresh();
  }, []);
  
  return (
    <VStack flex={1} bg='spars.green' position='relative'>
      <GlassBg h='70%' />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refresh} />
        }
        nestedScrollEnabled={true}
        contentContainerStyle={{
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
        }}>
        <HStack py='8' justifyContent='center' alignItems='center' onLayout={e => setHeadHeight(e.nativeEvent.layout.height)}>
          <Text bold color='white' fontSize='16'>Pilih Teknisi</Text>
          <Pressable position='absolute' left='6' p='2' onPress={goBack}>
            <ArrowBackIcon size='6' color='white' />
          </Pressable>
        </HStack>
        
        <VStack py='4' px='8' bg='white' borderTopRadius='20' minH={Dimensions.get('window').height - 20 - head_height}>
          <Radio.Group name='teknisi' accessibilityLabel="" flex='1' value={teknisi} onChange={setTeknisi}>
            {datas.map(teknisi => (
              <Box w='100%' alignItems='flex-start' py='5' borderBottomWidth='1' borderStyle='dashed' borderColor='spars.darkgrey'>
                <Radio value={`${teknisi.id_user}`}>
                  { teknisi.full_name }
                </Radio>
              </Box>
            ))}
          </Radio.Group>
        </VStack>
      </ScrollView>
      <Box bg='white' bottom='0' shadow='10.black' p='5' position='relative' zIndex={1}>
        <Button
          isDisabled={keluhanContext.state.loading}
          size='lg'
          p='4'
          bg='spars.orange'
          _text={{ color: 'white' }} shadow='9.orange'
          _pressed={{ bg: 'spars.orange', opacity: 0.8 }}
          onPress={submit}>
            Pilih Teknisi
        </Button>
      </Box>
      <Loader show={keluhanContext.state.loading} />
    </VStack>
  );
}

export default PilihTeknisi;