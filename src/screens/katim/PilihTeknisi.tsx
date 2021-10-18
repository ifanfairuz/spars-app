import React, { FC, useState } from 'react';
import { HStack, ScrollView, Text, VStack, Pressable, ArrowBackIcon, Checkbox, Box, Button } from 'native-base';
import { GlassBg } from '@components';
import { Dimensions } from 'react-native';
import { KatimScreenProps } from '.';

export type PilihTeknisiProps = KatimScreenProps<'PilihTeknisi'>;

const PilihTeknisi: FC<PilihTeknisiProps> = ({ navigation }) => {
  const [head_height, setHeadHeight] = useState(0);
  const goBack = () => navigation.canGoBack() && navigation.goBack();
  
  return (
    <VStack flex={1} bg='spars.green' position='relative'>
      <GlassBg h='70%' />
      <ScrollView
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
          <Checkbox.Group accessibilityLabel="" flex='1'>
          {[1,2,3,4,5].map(teknisi => (
            <Box w='100%' alignItems='flex-start' py='5' borderBottomWidth='1' borderStyle='dashed' borderColor='spars.darkgrey'>
              <Checkbox value={`${teknisi}`}>
                Muhammad Wildan Wari
              </Checkbox>
            </Box>
          ))}
          </Checkbox.Group>
          <Button
            size='lg'
            p='4'
            bg='spars.orange'
            _text={{ color: 'white' }} shadow='9.orange'
            _pressed={{ bg: 'spars.orange', opacity: 0.8 }}>
              Pilih Teknisi
          </Button>
        </VStack>
      </ScrollView>
    </VStack>
  );
}

export default PilihTeknisi;