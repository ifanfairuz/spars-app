import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { HStack, Text, VStack, Pressable, Box, FlatList, ArrowBackIcon } from 'native-base';
import { GlassBg, ReportCardTeknisiPreventif } from '@components';
import { ListRenderItem, RefreshControl } from 'react-native';
import { KatimScreenProps } from '.';
import Keluhan from '@store/models/Keluhan';
import AuthContext from '@context/AuthContext';
import Pemeliharaan from '@store/models/Pemeliharaan';
import moment from 'moment';

export type DetailReportPemeliharaanProps = KatimScreenProps<'DetailReportPemeliharaan'>;

const DetailReportPemeliharaan: FC<DetailReportPemeliharaanProps> = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  
  const goBack = () => navigation.goBack();
  const goToRiwayatPemeliharaan = () => navigation.navigate('RiwayatPemeliharaanKatim');

  const loading_refresh = useMemo(() => false, []);
  const refresh = () => {
  }

  const renderCard: ListRenderItem<Keluhan|Pemeliharaan> = ({ item }) => {
    return (
      <VStack
        px='6' pb='2'
        bg='white'
        space='md'
        borderColor='spars.darkgrey'>
        <HStack justifyContent='space-between' alignItems='center'>
          <Text bold fontSize='xs' color='spars.grey'>{ moment().format('DD MMMM YYYY').toUpperCase() }</Text>
        </HStack>
        <ReportCardTeknisiPreventif
          mb='5'
          onRiwayat={goToRiwayatPemeliharaan} />
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
        data={[1,2,3,4,5]}
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