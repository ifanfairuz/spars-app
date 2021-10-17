import React, { Component } from 'react';
import { UserScreenProps } from '.';
import TakeBarcodeComp from '../TakeBarcode';

export type TakeBarcodeProps = UserScreenProps<'TakeBarcode'>;

class TakeBarcode extends Component<TakeBarcodeProps> {
  render() {
    const { navigation } = this.props;
    return <TakeBarcodeComp goBack={() => navigation.goBack()} isFocused={true} />
  }
}

export default TakeBarcode;