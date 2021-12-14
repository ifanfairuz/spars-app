import React, { FC, useMemo } from 'react';
import { VStack, ScrollView, Box, HStack, Text, Pressable, Image, Button, Center } from 'native-base';
import { TeknisiScreenProps } from '.';
import { CollapseInfo, FileIcon } from '@components';
import { IHStackProps } from 'native-base/lib/typescript/components/primitives/Stack/HStack';
import moment from 'moment';
import { getOrDash } from '@support/helpers/string';
import { imagePenanganan } from '@support/helpers/image';
import { filePemeliharaan, download } from '@support/helpers/file';

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

export type DetailPemeliharaanProps = TeknisiScreenProps<'DetailPemeliharaan'>;

const DetailPemeliharaan: FC<DetailPemeliharaanProps> = ({ navigation, route }) => {
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
  }, [route.params.data])

  return (
    <Box flex='1' bg='white'>
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

          { !!data.hasil_pemeliharaan && (
            <CollapseInfo label='Hasil Pemeliharaan' autoOpen={true} mb='5'>
              <InfoItem label='Pelaksana' value={data.id_teknisi} />
              { !!data.pihak_ketiga && <InfoItem label='Pihak Ke 3' value={data.pihak_ketiga} /> }
              <InfoItem label='Hasil Pemeliharaan' value={ getOrDash(data.hasil_pemeliharaan) } borderBottomWidth='0' />
              { !!data.catatan_teknisi && (
                <Center
                  p='4'
                  my='5'
                  borderWidth='1'
                  borderStyle='dashed'
                  borderColor='#BDBDBD'
                  borderRadius='4'
                  bg='spars.lightgrey'
                  _text={{ color: 'spars.orange', fontSize: 'md' }}>
                    { getOrDash(data.catatan_teknisi) }
                </Center>
              ) }
              <HStack space='2xs' justifyContent='space-around' mb='5'>
                { data.foto.map(name => (
                  <Box position='relative' borderRadius='8' overflow='hidden' key={name}>
                    <Image size='lg' src={imagePenanganan(name)} alt='image' />
                    <Button
                      size='5'
                      borderRadius='4'
                      alignItems='center'
                      justifyContent='center'
                      position='absolute' right='2' top='2'
                      bg='rgba(0, 0, 0, 0.7)'>
                      <Image size='3' source={require('@assets/images/icon_times.png')} />
                    </Button>
                  </Box>
                )) }
              </HStack>
            </CollapseInfo>
          )}

        </VStack>
      </ScrollView>
    </Box>
  );
}

export default DetailPemeliharaan;