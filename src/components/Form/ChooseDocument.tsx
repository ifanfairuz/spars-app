import React, { FC } from 'react';
import { Box, Button, HStack, Image, Pressable, Text, Toast, VStack } from 'native-base';
import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack';
import DocumentPicker, { DocumentPickerResponse } from 'react-native-document-picker';
import FileIcon from '@components/Icon/FileIcon';
import { File } from '@support/http/contract/Params';
import { Platform } from 'react-native';

const toFile = (data: DocumentPickerResponse): File => ({
  uri: Platform.OS === "android" ? data.uri : data.uri.replace("file://", ""),
  name: data.name,
  type: data.type || undefined
});

export interface ChooseDocumentProps extends IVStackProps {
  values: File[]
  onAdd: (data: File[]) => void
  onRemove: (index: number) => void
  max?: number
}

const ChooseDocument: FC<ChooseDocumentProps> = ({ values, onAdd, onRemove, max, ...props }) => {
  const max_length = max || 3;
  const allow_types: string[] = [DocumentPicker.types.doc, DocumentPicker.types.docx, DocumentPicker.types.pdf];

  const validateFile = (file: DocumentPickerResponse) => {
    if (!allow_types.includes(file.type || '')) {
      return false;
    }

    return file;
  }

  const open = async () => {
    if (values.length >= max_length) {
      Toast.show({ title: `Maksimal dokumen ${max_length}x`, status: 'error'  });
      return;
    }

    DocumentPicker.pickMultiple({
      type: allow_types,
    })
    .then(results => {
      let files = [...values];
      let error: string|null = null;
      for (const res of results) {
        if (files.length >= max_length) {
          Toast.show({ title: `Maksimal dokumen ${max_length}x`, status: 'error'  });
          break;
        }
        const file = validateFile(res);
        if (file) {
          files.push(toFile(file));
        } else {
          error = 'File not valid.';
        }
      }
      if (error) Toast.show({ title: error, status: 'error' });
      onAdd(files);
    })
    .catch(err => {
      if (!DocumentPicker.isCancel(err)) {
        Toast.show({ title: err.message || err, status: 'error' });
      }
    });
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
        <Text fontSize='14' bold color='spars.grey'>Upload Dokumen (Maks 3x)</Text>
        <FileIcon size='sm' color='spars.grey' />
      </Pressable>
      <VStack space='md' justifyContent='flex-start' mb='20'>
        { values.map((file, i) => (
          <Box borderBottomWidth='1' borderColor='spars.darkgrey' p='2' borderRadius='8' overflow='hidden' key={file.uri}>
            <HStack space='sm' alignItems='center'>
              <FileIcon size='lg' color='spars.grey' />
              <Text flex='1'>{ file.name }</Text>
              <Button
                size='5'
                borderRadius='4'
                alignItems='center'
                justifyContent='center'
                bg='rgba(0, 0, 0, 0.7)'
                onPress={() => onRemove(i)}>
                <Image size='3' source={require('@assets/images/icon_times.png')} />
              </Button>
            </HStack>
          </Box>
        )) }
      </VStack>
    </VStack>
  );
}

export default ChooseDocument;