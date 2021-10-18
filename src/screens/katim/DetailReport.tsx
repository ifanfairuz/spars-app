import React, { FC, useState } from 'react';
import { HStack, Text, VStack, Pressable, ArrowBackIcon, ChevronDownIcon, ChevronRightIcon, Box, FlatList, Center, Image, Actionsheet, ScrollView } from 'native-base';
import { GlassBg, Label } from '@components';
import { ListRenderItem } from 'react-native';
import { KatimScreenProps } from '.';

const ReportCard: FC = () => {
  return (
    <VStack space='md' p='5' borderWidth='1' borderColor='spars.darkgrey' borderRadius='8'>
      <HStack alignItems='flex-start' justifyContent='space-between'>
        <VStack>
          <Text fontSize='md' bold>Hematology Analyzer</Text>
          <HStack space='sm'>
            <Text color='spars.grey' fontWeight='light'>Merk Alat</Text>
            <Text color='spars.grey' bold>Lab A12</Text>
          </HStack>
        </VStack>
        <Label
          bg='white'
          borderWidth='1'
          borderColor='spars.orange'
          _text={{ fontSize: 'xs', color: 'spars.orange' }}>KNC</Label>
      </HStack>
      <VStack>
        <Text>Kerusakan</Text>
        <Text color='spars.grey'>Sensor tidak Berfungsi</Text>
      </VStack>
      <Center
        p='4'
        borderWidth='1'
        borderStyle='dashed'
        borderColor='#BDBDBD'
        borderRadius='4'
        bg='spars.lightgrey'
        _text={{ color: 'spars.orange', fontSize: 'md' }}>
        sudah diperbaiki, tolong di jaga
      </Center>
      <HStack space='sm' justifyContent='flex-start' alignItems='center'>
        <Box bg='white' borderRadius='100'>
          <Image size='xs' borderRadius='100' source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwOFeX66lJg9GvAuptHMqmITaKozykBVDAqFdLvOnrzU3ZUz36U9w8e1a6sxJWclaosmU&usqp=CAU' }} alt='profile' />
        </Box>
        <VStack>
          <Text color='spars.green' bold>Ahmad Bayu</Text>
          <Text color='spars.grey' fontWeight='light'>Pelapor</Text>
        </VStack>
      </HStack>
    </VStack>
  );
}

export type DetailReportProps = KatimScreenProps<'DetailReport'>;

const DetailReport: FC<DetailReportProps> = ({ navigation }) => {
  const [riwayatOpen, setRiwayatOpen] = useState(false);
  const goBack = () => navigation.canGoBack() && navigation.goBack();

  const renderReport: ListRenderItem<number> = () => {
    return (
      <VStack
        px='6' pb='4' mb='4'
        bg='white'
        space='md'
        borderBottomWidth='1'
        borderColor='spars.darkgrey'>
        <ReportCard />
        <HStack justifyContent='space-between'>
          <Text bold color='spars.green'>SELESAI</Text>
          <Pressable flexDirection='row' onPress={() => setRiwayatOpen(true)}>
            <Text bold>Lihat Riwayat</Text>
            <ChevronRightIcon size='sm' />
          </Pressable>
        </HStack>
      </VStack>
    )
  }

  return (
    <Box flex={1} bg='white'>
      <FlatList
        data={[0,1,2,3,4,5,6,7,8,9]}
        renderItem={renderReport}
        nestedScrollEnabled={true}
        contentContainerStyle={{
          borderTopStartRadius: 20,
          borderTopEndRadius: 20
        }}
        ListHeaderComponent={() =>
          <VStack bg='spars.green'>
            <GlassBg />
            <HStack space='md' p='6' justifyContent='flex-start' alignItems='center'>
              <Pressable p='2' onPress={goBack}>
                <ArrowBackIcon size='6' color='white' />
              </Pressable>
              <Text bold color='white' fontSize='16'>Report</Text>
            </HStack>
            <VStack py='5' px='6' bg='white' borderTopRadius='20'>
              <Pressable flexDirection='row' py='4' pr='4' pl='6' justifyContent='space-between' alignItems='center' borderRadius='9' bg='white' shadow='5'>
                <Text fontSize='md' bold>Selesai</Text>
                <ChevronDownIcon size='sm' />
              </Pressable>
            </VStack>
          </VStack>
        } />

      <Actionsheet isOpen={riwayatOpen} onClose={() => setRiwayatOpen(false)}>
        <Actionsheet.Content>
          <ScrollView width="100%">
            {[1,2,3,4,5].map(r => (
              <HStack py='5' mx='5' justifyContent='space-between' borderBottomWidth='1' borderColor='#DEDEDE'>
                <Text color='spars.grey' fontSize='16'>Keluhan</Text>
                <Text bold>10 - 11 - 2021</Text>
              </HStack>
            ))}
          </ScrollView>
        </Actionsheet.Content>
      </Actionsheet>
    </Box>
  );
}

export default DetailReport;