import React, { FC } from 'react';
import { AspectRatio, Box, IBoxProps, Image, Stack, Text, HStack, Button } from 'native-base';
import Label from './Label';
import { gradient } from '@config/native-base';

export interface KeluhanKatimProps extends IBoxProps {
  onAccept?: () => void
}

const KeluhanKatim: FC<KeluhanKatimProps> = ({ onAccept, ...props }) => {
  return (
    <Box
      rounded='lg'
      overflow='hidden'
      width='80'
      shadow={9}
      bg='white'
      {...props}
    >
      <Box>
        <AspectRatio ratio={16 / 9}>
          <Image source={{uri: 'https://www.holidify.com/images/cmsuploads/compressed/Bangalore_citycover_20190613234056.jpg'}} alt='image' />
        </AspectRatio>
        <HStack
          position='absolute'
          bottom={0}
          px='3'
          pb='3'
          pt='5'
          alignItems='center'
          bg={gradient.black}>
          <Box flex='1'>
            <Text color='white' fontSize='md' bold>Hematology Analyzer</Text>
            <Text color='spars.green' fontSize='sm' bold>Ahmad Bayu <Text color='spars.darkgrey' bold>(Pelapor)</Text></Text>
          </Box>
          <Label bg='white' _text={{ color: 'spars.blue', fontSize: 'xs' }}>KNC</Label>
        </HStack>
      </Box>
      <Stack p='4' space={5}>
        <Box
          p='3'
          alignItems='center'
          borderWidth='1'
          borderColor='#BDBDBD'
          borderRadius='2'
          borderStyle='dashed'
          _text={{ color: 'spars.orange', fontWeight: '600', fontSize: 'xs',  letterSpacing: '1' }}>
          Sensor tidak berfungsi
        </Box>
        <HStack>
          <Box flex='1'>
            <Text fontSize='xs' color='spars.grey' letterSpacing='1'>Tgl Pelaporan</Text>
            <Text fontSize='xs' letterSpacing='0.5' bold>01 Januari 2021</Text>
          </Box>
          <Box flex='1'>
            <Text fontSize='xs' color='spars.grey' letterSpacing='1'>Tgl Approval Katim</Text>
            <Text fontSize='xs' letterSpacing='0.5' bold>01 Januari 2021</Text>
          </Box>
        </HStack>
        <HStack space='md'>
          <Button
            flex='1'
            variant='outline' 
            borderColor='spars.grey' _text={{ color: 'spars.grey' }}
            _pressed={{ bg: 'white', opacity: 0.8 }}>
            Tolak
          </Button>
          <Button
            flex='1'
            bg='spars.orange'
            _text={{ color: 'white' }} shadow='9.orange' onPress={onAccept}
            _pressed={{ bg: 'spars.orange', opacity: 0.8 }}>
            Terima
          </Button>
        </HStack>
      </Stack>
    </Box>
  )
}

export default KeluhanKatim;