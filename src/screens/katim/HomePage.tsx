import React, { FC, useState } from 'react';
import { Box, HStack, Image, ScrollView, Select, Text, VStack, ChevronDownIcon, Stack, Pressable, ArrowForwardIcon, FlatList } from 'native-base';
import { GlassBg, KeluhanKatim } from '@components';
import { Dimensions, ListRenderItem } from 'react-native';
import { gradient } from '@config/native-base';
import { KatimScreenProps } from '.';

export type HomePageProps = KatimScreenProps<'HomePage'>;

const HomePage: FC<HomePageProps> = ({ navigation }) => {
  const [head_height, setHeadHeight] = useState(0);
  const goToTerima = () => navigation.navigate('PilihTeknisi');

  const renderKeluhan: ListRenderItem<number> = () => {
    return (
      <KeluhanKatim mr='3' onAccept={goToTerima} />
    )
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
        <VStack p='5' space='md' onLayout={e => setHeadHeight(e.nativeEvent.layout.height)}>
          <HStack space='xs' alignItems='flex-start'>
            <Box p='1' bg='white' borderRadius='100'>
              <Image size='xs' borderRadius='100' source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwOFeX66lJg9GvAuptHMqmITaKozykBVDAqFdLvOnrzU3ZUz36U9w8e1a6sxJWclaosmU&usqp=CAU' }} alt='profile' />
            </Box>
            <VStack>
              <Text color='white' bold fontSize='16'>RSUD Mardi Waluyo - Blitar</Text>
              <Text color='white' fontSize='12'>Arif Ragil P ( Teknisi )</Text>
            </VStack>
          </HStack>
          <HStack justifyContent='space-between' alignItems='center'>
            <Text bold color='white'>OVERVIEW</Text>
            <Select
              placeholder='Filter Tanggal'
              placeholderTextColor='white'
              accessibilityLabel='Filter Tanggal'
              outlineStyle='none'
              variant='unstyled'
              maxW='150'
              flex='1'
              py='1' px='3'
              borderWidth='0'
              bg='spars.whitelight'
              color='white'
              dropdownIcon={<ChevronDownIcon size='6' color='white' mr='1' />}>
              <Select.Item value='08 January' label='08 January' />
              <Select.Item value='09 January' label='09 January' />
              <Select.Item value='10 January' label='10 January' />
            </Select>
          </HStack>
          <VStack py='5' bg='white' borderRadius='8'>
            
            <HStack px='5' space='md'>
              <VStack flex='1' space='xs'>
                <HStack justifyContent='space-between'>
                  <Text fontSize='md'>Pemeliharaan</Text>
                  <Text fontSize='sm' color='spars.grey' bold>16</Text>
                </HStack>
                <Box bg='spars.darkgrey' h='1' borderRadius='4'>
                  <Box position='absolute' borderRadius='4' h='1' w='90%' bg='spars.orange' />
                </Box>
                <Text fontSize='sm' color='spars.green2' bold>12 Selesai</Text>
              </VStack>
              <Stack justifyContent='center'>
                <Box w='50' h='50' bg={gradient.orange} borderRadius='8' justifyContent='center' alignItems='center'>
                  <Text fontSize='sm' bold color='white'>90%</Text>
                </Box>
              </Stack>
            </HStack>
            <Box my='4' w='100%' borderWidth='1' borderColor='spars.darkgrey' borderStyle='dashed' />
            <HStack px='5' space='md'>
              <VStack flex='1' space='xs'>
                <HStack justifyContent='space-between'>
                  <Text fontSize='md'>Keluhan</Text>
                  <Text fontSize='sm' color='spars.grey' bold>16</Text>
                </HStack>
                <Box bg='spars.darkgrey' h='1' borderRadius='4'>
                  <Box position='absolute' borderRadius='4' h='1' w='90%' bg='spars.blue' />
                </Box>
                <Text fontSize='sm' color='spars.green2' bold>12 Selesai</Text>
              </VStack>
              <Stack justifyContent='center'>
                <Box w='50' h='50' bg={gradient.blue} borderRadius='8' justifyContent='center' alignItems='center'>
                  <Text fontSize='sm' bold color='white'>90%</Text>
                </Box>
              </Stack>
            </HStack>

          </VStack>
        </VStack>
        
        <VStack pt='8' pb='2' bg='white' borderTopRadius='20' minH={Dimensions.get('window').height - head_height}>
          <VStack px='5' mb='2' space='xs'>
            <HStack justifyContent='space-between'>
              <Text bold fontSize='lg'>Pemeliharaan</Text>
              <Pressable>
                <Text>Buat Jadwal</Text>
              </Pressable>
            </HStack>
            <HStack borderWidth='1' borderColor='spars.lightergrey' pl='4' pr='2' py='2' justifyContent='space-between' alignItems='center' my='2'>
              <Text>Terjadwal 20 Pemeliharaan</Text>
              <Pressable>
                <Box py='2' px='4' bg={gradient.blue} borderRadius='5'>
                  <Text bold color='white' fontSize='xs'>VIEW</Text>
                </Box>
              </Pressable>
            </HStack>
          </VStack>

          <VStack>
            <HStack px='5' justifyContent='space-between'>
              <Text bold fontSize='lg'>Keluhan Baru</Text>
              <Pressable>
                <ArrowForwardIcon size='sm' color='spars.red' />
              </Pressable>
            </HStack>
            <FlatList
              data={[1,2,3,4,5]}
              renderItem={renderKeluhan}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingVertical: 20, paddingLeft: 20, paddingRight: 10 }} />
          </VStack>
        </VStack>
      </ScrollView>
    </VStack>
  );
}

export default HomePage;