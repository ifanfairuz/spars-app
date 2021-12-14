import React, { FC, useContext, useMemo } from 'react';
import { HStack, Text, VStack, Pressable, Box, FlatList, ArrowBackIcon } from 'native-base';
import { GlassBg, ReportCardTeknisiPreventif } from '@components';
import { ListRenderItem, RefreshControl } from 'react-native';
import { KatimScreenProps } from '.';
import AuthContext from '@context/AuthContext';
import Pemeliharaan from '@store/models/Pemeliharaan';
import moment from 'moment';
import PemeliharaanKatimContext from '@context/pemeliharaan/PemeliharaanKatimContext';

export type DetailReportPemeliharaanProps = KatimScreenProps<'DetailReportPemeliharaan'>;

const DetailReportPemeliharaan: FC<DetailReportPemeliharaanProps> = ({ navigation }) => {
  const pemeliharaanContext = useContext(PemeliharaanKatimContext);
  const authContext = useContext(AuthContext);
  
  const goBack = () => navigation.goBack();
  const goToRiwayatPemeliharaan = (data: Pemeliharaan) => navigation.navigate('RiwayatPemeliharaanKatim', { data });

  const renderCard: ListRenderItem<Pemeliharaan> = ({ item }) => {
    return (
      <VStack
        px='6' pb='2'
        bg='white'
        space='md'
        borderColor='spars.darkgrey'>
        <HStack justifyContent='space-between' alignItems='center'>
          <Text bold fontSize='xs' color='spars.grey'>{ moment(item.tgl_jadwal, 'YYYY-MM-DD').format('DD MMMM YYYY').toUpperCase() }</Text>
        </HStack>
        <ReportCardTeknisiPreventif
          data={item}
          mb='5'
          onRiwayat={() => goToRiwayatPemeliharaan(item)} />
      </VStack>
    )
  }

  return (
    <Box flex={1} bg='white'>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={pemeliharaanContext.state.loading}
            onRefresh={() => {pemeliharaanContext.getPemeliharaan(moment())}} />
        }
        data={pemeliharaanContext.state.datas}
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
              <Pressable onPress={goBack} flexDir='row' justifyContent='flex-start' alignItems='center'>
                <Box mr={2}>
                  <ArrowBackIcon size='sm' color='white' />
                </Box>
                <Text bold color='white' fontSize='16'>Data Pemeliharaan</Text>
              </Pressable>
            </HStack>
            <Box h='8' bg='white' borderTopRadius='20' />
          </VStack>
        } />
    </Box>
  );
}

export default DetailReportPemeliharaan;