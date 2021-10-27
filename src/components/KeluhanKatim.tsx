import React, { FC } from 'react';
import { AspectRatio, Box, IBoxProps, Image, Stack, Text, HStack, Button, Pressable } from 'native-base';
import Label from './Label';
import { gradient } from '@config/native-base';
import Keluhan from '@store/models/Keluhan';
import { imageKeluhan } from '@support/helpers/image';
import { ellipsis } from '@support/helpers/string';

export interface KeluhanKatimProps extends IBoxProps {
  onAccept?: () => void
  onDecline?: () => void
  goDetail?: () => void
  data: Keluhan
}

const KeluhanKatim: FC<KeluhanKatimProps> = ({ data, onAccept, onDecline, goDetail, ...props }) => {
  return (
    <Box
      rounded='lg'
      overflow='hidden'
      width='80'
      shadow={9}
      bg='white'
      {...props}
    >
      <Pressable onPress={goDetail}>
        <AspectRatio ratio={16 / 9}>
          <Image src={imageKeluhan(data.detail.foto_mini_1) || require('@assets/images/placeholder.png')} alt='image' />
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
            <Text color='white' fontSize='md' bold>{ data.nama_alat }</Text>
            <Text color='spars.green' fontSize='sm' bold>{ data.nama_user } <Text color='spars.darkgrey' bold>(Pelapor)</Text></Text>
          </Box>
          <Label bg='white' _text={{ color: 'spars.blue', fontSize: 'xs' }}>{ data.insiden }</Label>
        </HStack>
      </Pressable>
      <Pressable onPress={goDetail}>
        <Stack p='4' space={5}>
        { !!data.detail.deskripsi_keluhan && (
          <Box
            p='3'
            alignItems='center'
            borderWidth='1'
            borderColor='#BDBDBD'
            borderRadius='2'
            borderStyle='dashed'
            _text={{ color: 'spars.orange', fontWeight: '600', fontSize: 'xs',  letterSpacing: '1' }}>
            { ellipsis(data.detail.deskripsi_keluhan, 30) }
          </Box>
        ) }
        { !!data.catatan_teknisi && (
          <Box
            p='3'
            alignItems='center'
            borderWidth='1'
            borderColor='#BDBDBD'
            borderRadius='2'
            borderStyle='dashed'
            _text={{ color: 'spars.blue', fontWeight: '600', fontSize: 'xs',  letterSpacing: '1' }}>
            { ellipsis(data.catatan_teknisi, 30) }
          </Box>
        ) }
        { !!data.hasil_penanganan && (
          <Box
            p='3'
            alignItems='center'
            borderWidth='1'
            borderColor='#BDBDBD'
            borderRadius='2'
            borderStyle='dashed'
            _text={{ color: 'spars.green', fontWeight: '600', fontSize: 'xs',  letterSpacing: '1' }}>
            { ellipsis(data.hasil_penanganan, 30) }
          </Box>
        ) }
          <HStack>
            <Box flex='1'>
              <Text fontSize='xs' color='spars.grey' letterSpacing='1'>Tgl Pelaporan</Text>
              <Text fontSize='xs' letterSpacing='0.5' bold>{ data.tgl_masuk }</Text>
            </Box>
            <Box flex='1'>
              <Text fontSize='xs' color='spars.grey' letterSpacing='1'>Tgl Approval Katim</Text>
              <Text fontSize='xs' letterSpacing='0.5' bold>01 Januari 2021</Text>
            </Box>
          </HStack>
        </Stack>
      </Pressable>
      <Stack p='4' space={5}>
        <HStack space='md'>
          <Button
            flex='1'
            variant='outline' 
            borderColor='spars.grey' _text={{ color: 'spars.grey' }}
            _pressed={{ bg: 'white', opacity: 0.8, borderColor: 'spars.grey' }}
            onPress={onDecline}>
            Tolak
          </Button>
          <Button
            flex='1'
            bg='spars.orange'
            _text={{ color: 'white' }} shadow='9.orange'
            _pressed={{ bg: 'spars.orange', opacity: 0.8 }}
            onPress={onAccept}>
            Terima
          </Button>
        </HStack>
      </Stack>
    </Box>
  )
}

export default KeluhanKatim;