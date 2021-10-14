import React, { FC } from 'react';
import { VStack, Input, SearchIcon, Text, Box, FlatList } from 'native-base';
import { ListRenderItem } from 'react-native';
import { GlassBg, Keluhan } from '@components';

const ListKeluhan: FC = () => {
  const renderKeluhan: ListRenderItem<number> = (item) => {
    return <Keluhan mb='3' mx='8' />
  }

  return (
    <FlatList
      data={[0,1,2,3,4,5,6,7,8,9]}
      renderItem={renderKeluhan}
      nestedScrollEnabled={true}
      contentContainerStyle={{ backgroundColor: 'white', paddingBottom: 20 }}
      ListHeaderComponent={() =>
        <VStack bg='spars.green2'>
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
      } />
  );
}

export default ListKeluhan;