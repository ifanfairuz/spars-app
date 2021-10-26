import React, { FC, useState } from 'react';
import { Box, Button, SmallCloseIcon, HStack, Image, Modal, Pressable, Text, Toast, VStack } from 'native-base';
import { Asset, CameraOptions, ImageLibraryOptions, launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import CameraIcon from '@components/Icon/CameraIcon';
import GalleryIcon from '@components/Icon/GalleryIcon';
import { checkPermission } from '@support/helpers/functions';

export interface TakePhotoProps extends IVStackProps {
  values: string[]
  onAdd: (data: Asset[]) => void
  onRemove: (index: number) => void
  max?: number
}

const TakePhoto: FC<TakePhotoProps> = ({ values, onAdd, onRemove, max, ...props }) => {
  const [showModal, setShowModal] = useState(false)
  const max_length = max || 3;

  const takePhoto = async () => {
    if (values.length >= max_length) {
      Toast.show({ title: `Maksimal foto ${max_length}x`, status: 'error'  })
      return;
    }
    const allow = await checkPermission('CAMERA');
    if (!allow) {
      Toast.show({ title: `Tidak bisa akses kamera`, status: 'error'  });
      setShowModal(false);
      return;
    }

    let options: CameraOptions = {
      quality: 0.5,
      saveToPhotos: false,
      includeBase64: true,
      cameraType: 'back',
      mediaType: 'photo'
    };
    launchCamera(options, (response) => {
      if (!response.didCancel && !response.errorCode) {
        if (response.assets) {
          setShowModal(false);
          onAdd(response.assets);
        }
      } else if (response.errorCode) {
        Toast.show({ title: response.errorMessage, status: 'error' });
      }      
    });
  };

  const openGallery = async () => {
    if (values.length >= max_length) {
      Toast.show({ title: `Maksimal foto ${max_length}x`, status: 'error'  })
      return;
    }
    const allow = await checkPermission('READ_EXTERNAL_STORAGE');
    if (!allow) {
      Toast.show({ title: `Tidak bisa akses galeri`, status: 'error'  });
      setShowModal(false);
      return;
    }

    let options: ImageLibraryOptions = {
      quality: 0.5,
      includeBase64: true,
      mediaType: 'photo',
      selectionLimit: max_length - values.length
    };
    launchImageLibrary(options, (response) => {
      if (!response.didCancel && !response.errorCode) {
        if (response.assets) {
          setShowModal(false);
          onAdd(response.assets);
        }
      } else if (response.errorCode) {
        Toast.show({ title: response.errorMessage, status: 'error' });
      }
    });
  };

  const open = () => {
    if (values.length >= max_length) {
      Toast.show({ title: `Maksimal foto ${max_length}x`, status: 'error'  })
      return;
    }
    setShowModal(true);
  }

  return (
    <VStack space='md' {...props}>
      <Pressable
        p='4'
        bg='spars.lightgrey'
        borderWidth='1'
        borderColor='spars.darkgrey'
        borderRadius='8'
        borderStyle='dashed'
        justifyContent='space-between'
        flexDir='row'
        onPress={open}>
        <Text fontSize='14' fontWeight='700' color='spars.grey'>Upload Foto (Maks 3x)</Text>
        <Image size='2xs' source={require('@assets/images/icon_camera.png')} />
      </Pressable>
      <HStack space='md' justifyContent='flex-start' mb='20'>
        { values.map((uri, i) => (
          <Box position='relative' borderRadius='8' overflow='hidden' key={uri}>
            <Image size='lg' src={uri} alt='image' />
            <Button
              size='5'
              borderRadius='4'
              alignItems='center'
              justifyContent='center'
              position='absolute' right='2' top='2'
              bg='rgba(0, 0, 0, 0.7)'
              onPress={() => onRemove(i)}>
              <Image size='3' source={require('@assets/images/icon_times.png')} />
            </Button>
          </Box>
        )) }
      </HStack>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            <Button.Group flexDir='column' space='md' py='5' px='3'>
              <Button
                py='3'
                variant='ghost'
                _text={{ color: 'black' }}
                _pressed={{ bg: 'spars.darkgrey', opacity: 0.8 }}
                size='lg'
                justifyContent='flex-start'
                leftIcon={<CameraIcon size='sm' mr='1' color='black' />}
                onPress={() => takePhoto()}>
                Buka Kamera
              </Button>
              <Button
                py='3'
                variant='ghost'
                _text={{ color: 'black' }}
                _pressed={{ bg: 'spars.darkgrey', opacity: 0.8 }}
                size='lg'
                justifyContent='flex-start'
                leftIcon={<GalleryIcon size='sm' mr='1' color='black' />}
                onPress={() => openGallery()}>
                Buka Galeri
              </Button>
              <Button
                py='3'
                variant='ghost'
                _text={{ color: 'black' }}
                _pressed={{ bg: 'spars.darkgrey', opacity: 0.8 }}
                size='lg'
                justifyContent='flex-start'
                leftIcon={<SmallCloseIcon size='sm' mr='1' color='black' />}
                onPress={() => setShowModal(false)}>
                Batal
              </Button>
            </Button.Group>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </VStack>
  );
}

export default TakePhoto;