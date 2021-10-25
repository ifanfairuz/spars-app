import React, { Component } from 'react';
import { BarCodeReadEvent } from 'react-native-camera';
import { UserScreenProps } from '.';
import TakeBarcodeComp from '../TakeBarcode';

export type TakeBarcodeProps = UserScreenProps<'TakeBarcode'>;

class TakeBarcode extends Component<TakeBarcodeProps> {
  render() {
    const { navigation, route } = this.props;
    const onRead = (e: BarCodeReadEvent) => {
      if (route.params?.onRead) route.params.onRead(e, navigation);
    }
    return <TakeBarcodeComp goBack={() => navigation.goBack()} isFocused={true} onRead={onRead} />
  }
}

export default TakeBarcode;