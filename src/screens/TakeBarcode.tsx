import React, { FC, PropsWithChildren, PureComponent } from 'react';
import { Box, Pressable, VStack, ArrowBackIcon, Text, Toast } from 'native-base';
import { RNCamera, BarCodeReadEvent } from 'react-native-camera';
import { StyleSheet, ActivityIndicator } from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import { checkPermission } from '@support/helpers/functions';

const PendingView: FC<PropsWithChildren<{}>> = ({ children }) => (
  <Box flex='1' bg='spars.lightgrey' width='100%' justifyContent='center' alignItems='center'>
    {children}
  </Box>
);

export interface TakeBarcodeProps {
  goBack: () => void,
  onRead?: (e: BarCodeReadEvent) => void,
  isFocused: boolean
};

class TakeBarcode extends PureComponent<TakeBarcodeProps, { hasCameraPermission: boolean }> {
  constructor(props: TakeBarcodeProps) {
    super(props);
    this.state = {
      hasCameraPermission: false
    }
  }

  componentDidMount() {
    this.checkPermission();
  }

  async checkPermission() {
    const camera_allow = await checkPermission('CAMERA');
    this.setState({ hasCameraPermission: camera_allow });
  }

  onBarCodeRead(e: BarCodeReadEvent) {
    if (e.data != '') {
      Toast.show({ title: e.data, status: 'success' });
      if (this.props.onRead) this.props.onRead(e);
    } else {
      Toast.show({ title: 'invalid barcode', status: 'error' });
    }
  }

  render() {
    const { goBack, isFocused } = this.props;
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === false) {
      return (
        <PendingView>
          <Text>No access to camera</Text>
        </PendingView>
      );
    } else if (hasCameraPermission !== null && isFocused) {
      return (
        <VStack flex='1' bg='black'>
          <RNCamera
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            useNativeZoom={true}
            onBarCodeRead={this.onBarCodeRead.bind(this)}>
            {({ status }) => {
              if (status !== 'READY') return (
                <PendingView>
                  <ActivityIndicator size='large' />
                </PendingView>
              );
              return (
                <VStack flex='1' width='100%'>
                  <BarcodeMask edgeRadius={8} edgeBorderWidth={6} edgeWidth={40} edgeHeight={40} />
                  <Box width='100%' alignItems='flex-start' p='5' position='absolute' top='0' left='0'>
                    <Pressable onPress={goBack}>
                      <ArrowBackIcon size='6' color='white' />
                    </Pressable>
                  </Box>
                </VStack>
              );
            }}
          </RNCamera>
        </VStack>
      )
    } else {
      return null;
    }
  }
}

const styles = StyleSheet.create({
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
});

export default TakeBarcode;