import React, { FC, useContext, useMemo, useState } from 'react';
import { VStack, ScrollView, Box, HStack, Input, TextArea, Text, Pressable, Image, Button, Radio, Toast } from 'native-base';
import { TeknisiScreenProps } from '.';
import { ChooseDocument, CollapseInfo, FileIcon, Loader, TakePhoto } from '@components';
import { IHStackProps } from 'native-base/lib/typescript/components/primitives/Stack/HStack';
import moment from 'moment';
import { getOrDash } from '@support/helpers/string';
import { filePemeliharaan, download } from '@support/helpers/file';
import { Asset } from 'react-native-image-picker';
import { File } from '@support/http/contract/Params';
import PemeliharaanTeknisiContext from '@context/pemeliharaan/PemeliharaanTeknisiContext';

const InfoItem: FC<{ label: string, value: string } & IHStackProps> = ({ label, value, ...props }) => {
  return (
    <HStack
      py='4'
      justifyContent='space-between'
      alignItems='center'
      borderBottomWidth='1'
      borderColor='#DEDEDE'
      borderStyle='dashed'
      space='lg'
      {...props}>
      <Text color='spars.grey'>{label}</Text>
      <Text bold flex='1' textAlign='right'>{value}</Text>
    </HStack>
  );
}
const InfoFile: FC<{ name: string }> = ({ name }) => {
  return (
    <Pressable
      flexDirection='row'
      py='2'
      justifyContent='space-between'
      alignItems='center'
      onPress={() => download(filePemeliharaan(name)) }>
      <Box flex='1'>
        <Text>{ name }</Text>
      </Box>
      <FileIcon ml='2' size='sm' />
    </Pressable>
  );
}

export type FormPemeliharaanProps = TeknisiScreenProps<'FormPemeliharaan'>;

const FormPemeliharaan: FC<FormPemeliharaanProps> = ({ navigation, route }) => {
  const pemeliharaanContext = useContext(PemeliharaanTeknisiContext);

  const [loading, setLoading] = useState(false);
  const [pelaksana, setPelaksana] = useState('teknisi');
  const [catatan, setCatatan] = useState('');
  const [pihak3, setPihak3] = useState('');
  const [hasil, setHasil] = useState('');
  const [images, setImages] = useState<Asset[]>([]);
  const [dokuments, setDokuments] = useState<File[]>([]);
  const goToMain = () => navigation.replace('Report');

  const data = useMemo(() => {
    const { data } = route.params;
    const foto = [
      data.foto_1,
      data.foto_2,
      data.foto_3,
    ].filter(i => (i[0] && i[0] !== ''));
    return {
      ...data,
      foto
    }
  }, [route.params.data]);
  const images_list = useMemo(() => images.map(i => i.uri || ''), [images]);

  const submit = () => {
    if (!hasil || hasil == '') {
      Toast.show({ title: 'Gagal Pemeliharaan', status: 'error' });
      return false;
    }
    setLoading(true);
    pemeliharaanContext.tanganiPemeliharaan({
      id_pemeliharaan: data.id_pemeliharaan,
      id_system: data.id_system,
      id_teknisi: data.id_teknisi,
      pihak_ketiga: pihak3,
      catatan: catatan,
      hasil_pemeliharaan: hasil,
      foto_1: images.length > 0 ? images[0].base64 : undefined,
      foto_2: images.length > 1 ? images[1].base64 : undefined,
      foto_3: images.length > 2 ? images[2].base64 : undefined,
      upload_berkas_1: dokuments.length > 0 ? images[0]: undefined,
      upload_berkas_2: dokuments.length > 1 ? images[1]: undefined,
      upload_berkas_3: dokuments.length > 2 ? images[2]: undefined,
    })
    .then(res => {
      Toast.show({ title: 'Berhasil Pemeliharaan', status: 'success' });
      goToMain();
    })
    .catch(() => {
      Toast.show({ title: 'Gagal Pemeliharaan', status: 'error' });
    })
    .finally(() => {
      setLoading(false);
    });
  }

  return (
    <Box flex='1' bg='white'>
      <Loader show={loading} />
      <ScrollView>
        <VStack p='5' space='md'>

          <CollapseInfo label='Info Dokumen' autoOpen={true} mb='5'>
            <InfoItem label='Jenis Pemeliharaan' value={getOrDash(data.tipe_pemeliharaan)} />
            {!!data.kategori_alat && <InfoItem label='Kategori Alat' value={data.kategori_alat} />}
            <InfoItem label='Tgl Terjadwal' value={moment(data.tgl_jadwal, 'YYYY-MM-DD').format('DD MMMM YYYY')} />
            <InfoItem label='Tgl Pelaksanaan' value={
              data.tgl_pelaksanaan && data.tgl_pelaksanaan != '0000-00-00' ?
              moment(data.tgl_pelaksanaan, 'YYYY-MM-DD').format('DD MMMM YYYY') : '-'
            } borderBottomWidth='0' />
            {!!data.berkas_1 && <InfoFile name={data.berkas_1} />}
            {!!data.berkas_2 && <InfoFile name={data.berkas_2} />}
            {!!data.berkas_3 && <InfoFile name={data.berkas_3} />}
          </CollapseInfo>
          
          <CollapseInfo label='Detail Alat' autoOpen={true} mb='5'>
            <InfoItem label='Nama Alat' value={getOrDash(data.nama_alat)} />
            <InfoItem label='Nomor Seri' value={getOrDash(data.no_seri)} />
            <InfoItem label='Ruangan' value={getOrDash(data.nama_ruangan)} />
          </CollapseInfo>
          
          <VStack space='sm'>
            <Text bold>Pelaksana</Text>
            <Radio.Group
              flexDirection='row'
              name="pelaksana"
              accessibilityLabel="pelaksana"
              value={pelaksana}
              onChange={v => setPelaksana(v)}>
              <Radio flex='1' alignItems='flex-start' value="teknisi" _text={{ fontSize: 'sm' }}>
                Teknisi
              </Radio>
              <Radio flex='1' alignItems='flex-start' value="pihak3" _text={{ fontSize: 'sm' }}>
                Pihak ke-3
              </Radio>
            </Radio.Group>
            { pelaksana == 'pihak3' && (
              <Input
                ml='50%'
                py='2' px='4'
                maxW='50%'
                size='md'
                fontWeight='400'
                bg='white'
                value={pihak3}
                onChangeText={setPihak3} />
            ) }
          </VStack>

          <TextArea h={40} placeholder='Catatan' textAlignVertical='top' value={catatan} onChangeText={setCatatan} />

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

          <ChooseDocument
            values={dokuments}
            onAdd={(data) => setDokuments(data)}
            onRemove={(index) => {
              const docs = [...dokuments];
              docs.splice(index, 1);
              setDokuments(docs);
            }} />
          

          <VStack space='md' mb='5'>
            <Text bold>Hasil Pemeliharaan</Text>
            <Radio.Group name='hasil_pemeliharaan' flexDirection='row' justifyContent='space-around' value={hasil} onChange={setHasil}>
              <Radio alignItems='flex-start' value='Baik'>Baik</Radio>
              <Radio alignItems='flex-start' value='Tidak Layak'>Tidak Layak</Radio>
            </Radio.Group>
          </VStack>

          <Button
            py='4'
            size='lg'
            bg='spars.orange'
            shadow='9.orange'
            _text={{ color: 'white' }}
            _pressed={{ bg: 'spars.orange', opacity: 0.8 }}
            onPress={submit}>
            Submit
          </Button>

        </VStack>
      </ScrollView>
    </Box>
  );
}

export default FormPemeliharaan;