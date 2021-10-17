import React, { Component } from 'react';
import { UserScreenProps } from '.';
import TakePhotoComp from '../TakePhoto';

export type TakePhotoProps = UserScreenProps<'TakePhoto'>;

class TakePhoto extends Component<TakePhotoProps> {
  render() {
    const { navigation } = this.props;
    return <TakePhotoComp goBack={() => navigation.goBack()} isFocused={true} />
  }
}

export default TakePhoto;