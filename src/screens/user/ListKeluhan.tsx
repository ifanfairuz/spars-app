import React, { FC } from 'react';
import { VStack, Input, SearchIcon, Text, Box, FlatList, Pressable } from 'native-base';
import { ListRenderItem } from 'react-native';
import { GlassBg, KeluhanUser, ButtonScan } from '@components';
import { UserScreenProps } from '.';

export type ListKeluhanProps = UserScreenProps<'ListKeluhan'>;

const ListKeluhan: FC<ListKeluhanProps> = ({ navigation }) => {
  const goToTambahKeluhan = () => navigation.navigate('TambahKeluhan');
  const goToDetailKeluhan = () => navigation.navigate('DetailKeluhan');
  const goToTakeBarcode = () => navigation.navigate('TakeBarcode');

  const renderKeluhan: ListRenderItem<number> = (item) => {
    return (
      <Box px='8' pb='3' bg='white'>
        <KeluhanUser onPress={goToDetailKeluhan} />
      </Box>
    );
  }

  return (
    <Box flex={1} bg='white'>
      <FlatList
        data={[0,1,2,3,4,5,6,7,8,9]}
        renderItem={renderKeluhan}
        nestedScrollEnabled={true}
        contentContainerStyle={{
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
        }}
        ListHeaderComponent={() =>
          <VStack bg='spars.green'>
            <GlassBg />
            <Box p='5'>
              <Input
                borderWidth='0'
                bg='rgba(0,0,0,0.2)'
                px='5' py='3'
                color='white'
                fontSize='14px'
                lineHeight='22px'
                placeholder='Cari Keluhan'
                placeholderTextColor='white'
                InputRightElement={<SearchIcon color='white' size='18px' mr='5' />} />
            </Box>
            <Box px='5' py='5' bg='white' borderTopRadius='20'>
              <Text fontWeight='700'>Keluhan</Text>
            </Box>
          </VStack>
        }
        ListFooterComponent={() => <Box height='8' bg='white' />} />

      <Box bg='white' bottom='0' shadow='10.black' p='5'>
        <Pressable p='2' onPress={goToTambahKeluhan}>
          <Text fontWeight='700' color='spars.orange'>+ TAMBAH LAPORAN KELUHAN</Text>
        </Pressable>
        <ButtonScan position='absolute' right='5' top={-20} onPress={goToTakeBarcode} />
      </Box>
    </Box>
  );
}

export default ListKeluhan;