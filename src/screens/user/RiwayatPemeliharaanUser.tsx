import React, { FC, useContext, useEffect, useMemo, useState } from 'react';
import { HStack, Text, VStack, Pressable, ArrowBackIcon, Box, FlatList, Select, ChevronDownIcon, CloseIcon } from 'native-base';
import { GlassBg, ReportCardTeknisiPreventif } from '@components';
import { ListRenderItem, RefreshControl } from 'react-native';
import { UserScreenProps } from '.';
import Keluhan from '@store/models/Keluhan';
import AuthContext from '@context/AuthContext';
import Pemeliharaan from '@store/models/Pemeliharaan';

export type RiwayatPemeliharaanUserProps = UserScreenProps<'RiwayatPemeliharaanUser'>;

const RiwayatPemeliharaanUser: FC<RiwayatPemeliharaanUserProps> = ({ navigation }) => {
  const authContext = useContext(AuthContext);
  
  const goToDetailPemeliharaan = () => navigation.navigate('DetailPemeliharaanUser');
  const goBack = () => navigation.goBack()

  const loading_refresh = useMemo(() => false, []);
  const refresh = () => {
  }

  const renderCard: ListRenderItem<Keluhan|Pemeliharaan> = ({ item }) => {
    return (
      <Pressable
        onPress={goToDetailPemeliharaan}
        px='6' pb='1'
        bg='white'
        borderColor='spars.darkgrey'>
        <ReportCardTeknisiPreventif mb='5' isDetail />
      </Pressable>
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
        data={[1,2,3]}
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
                <Text bold color='white' fontSize='16'>Riwayat Pemeliharaan</Text>
              </Pressable>
            </HStack>
            <Box h='8' bg='white' borderTopRadius='20' />
          </VStack>
        } />
    </Box>
  );
}

export default RiwayatPemeliharaanUser;