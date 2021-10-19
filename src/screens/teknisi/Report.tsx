import React, { FC, useState } from 'react';
import { HStack, ScrollView, Text, VStack, Pressable, ArrowBackIcon, Checkbox, Box, Button, Select, Center, ITextProps } from 'native-base';
import { CalendarIcon, GlassBg } from '@components';
import { Dimensions } from 'react-native';
import { TeknisiScreenProps } from '.';
import moment from 'moment';
import { IColors } from 'native-base/lib/typescript/theme/base/colors';
import { ILinearGradientProps } from 'native-base/lib/typescript/components/primitives/Box/types';
import { ResponsiveValue } from 'native-base/lib/typescript/components/types';
import { gradient } from '@config/native-base';
import { IHStackProps } from 'native-base/lib/typescript/components/primitives/Stack/HStack';

interface ReportItemProps extends IHStackProps {
  variant: 'outline' | 'filled',
  color?: ResponsiveValue<IColors | (string & {}) | ILinearGradientProps>;
  _text?: Partial<ITextProps>;
  label: string
  count: number | string
}

const ReportItem: FC<ReportItemProps> = ({ variant, color, _text, label, count, ...props }) => {
  const isFilled = variant == 'filled';
  return (
    <HStack
      py='4' mx='4'
      borderBottomWidth='1'
      borderStyle='dashed'
      borderColor='spars.darkgrey'
      justifyContent='space-between'
      alignItems='center'
      space='md'
      {...props}>
      <Text fontSize='md' flex='1' {..._text}>{label}</Text>
      <Center
        h='10' w='10'
        bg={isFilled ? color : undefined}
        borderWidth={!isFilled ? 1 : undefined}
        borderColor={!isFilled ? color as (string | object) : undefined}
        borderRadius='8'
        _text={{
          color: isFilled ? 'white' : color as (string | object),
          bold: true
        }}>
          {count}
        </Center>
    </HStack>
  )
}

interface ReportComponentProps {
  boxColor?: ResponsiveValue<IColors | (string & {}) | ILinearGradientProps>;
  color?: ResponsiveValue<IColors | (string & {}) | ILinearGradientProps>;
  label: string
}

const ReportComponent: FC<ReportComponentProps> = ({ label, color, boxColor }) => {
  const mainColor = color || 'spars.green';

  return (
    <VStack p='4' borderWidth='1' borderColor='spars.darkgrey' borderRadius='8'>
      <ReportItem variant='filled' color={boxColor} label={label} count='40' _text={{ bold: true }} />
      <ReportItem variant='outline' color={color} label='Selesai' count='40' />
      <ReportItem variant='outline' color={color} label='Belum Selesai' count='40' />
      <ReportItem variant='outline' color={color} label='Selesai Dengan Syarat / Sparepart' count='40' />
      <ReportItem variant='outline' color={color} label='Belum ditangani' count='40' />
      <ReportItem variant='outline' color={color} borderBottomWidth='0' label='Moving' count='40' />
    </VStack>
  );
}

export type ReportProps = TeknisiScreenProps<'Report'>;

const Report: FC<ReportProps> = ({ navigation }) => {
  const [filter_month, setFilterMonth] = useState(`${moment().month()}`);
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
        <HStack space='md' p='6' justifyContent='flex-start' alignItems='center' onLayout={e => setHeadHeight(e.nativeEvent.layout.height)}>
          <Pressable p='2' onPress={goBack}>
            <ArrowBackIcon size='6' color='white' />
          </Pressable>
          <Text bold color='white' fontSize='16'>Report</Text>
        </HStack>
        
        <VStack space='md' py='7' px='6' bg='white' borderTopRadius='20' minH={Dimensions.get('window').height - head_height}>
          <Select
            px='5'
            color='spars.grey'
            placeholder='Filter Bulan'
            selectedValue={filter_month}
            onValueChange={v => setFilterMonth(v)}
            dropdownIcon={<CalendarIcon size='sm' mr='3' />}>
            { moment.months().map((m, i) => <Select.Item value={`${i+1}`} label={m} />) }
          </Select>
          <ReportComponent boxColor={gradient.orange} color='spars.orange' label='Laporan Keluhan' />
          <ReportComponent boxColor={gradient.blue} color='spars.blue' label='Laporan Pemeliharaan' />
        </VStack>
      </ScrollView>
    </VStack>
  );
}

export default Report;