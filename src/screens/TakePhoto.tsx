import React, { FC, PropsWithChildren, PureComponent } from 'react';
import { Box, Pressable, VStack, CircleIcon, ArrowBackIcon, Text } from 'native-base';
import { RNCamera } from 'react-native-camera';
import { StyleSheet, ActivityIndicator, PermissionsAndroid } from 'react-native';

const PendingView: FC<PropsWithChildren<{}>> = ({ children }) => (
  <Box flex='1' bg='spars.lightgrey' width='100%' justifyContent='center' alignItems='center'>
    {children}
  </Box>
);

export interface TakePhotoProps {
  goBack: () => void,
  isFocused: boolean
};

class TakePhoto extends PureComponent<TakePhotoProps, { hasCameraPermission: boolean }> {
  constructor(props: TakePhotoProps) {
    super(props);
    this.state = {
      hasCameraPermission: false
    }
    this.checkPermission();
  }

  takePicture = async function(camera: RNCamera) {
    const options = { quality: 1, base64: true };
    const data = await camera.takePictureAsync(options);
    console.log(data.uri);
  };

  checkPermission() {
    return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS['CAMERA'])
    .then(allow => this.setState({ hasCameraPermission: !!allow }));
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
            useNativeZoom={true}>
            {({ camera, status }) => {
              if (status !== 'READY') return (
                <PendingView>
                  <ActivityIndicator size='large' />
                </PendingView>
              );
              return (
                <VStack flex='1' width='100%' justifyContent='space-between' alignItems='center' pb='5'>
                  <Box width='100%' alignItems='flex-start' p='3' bg='spars.grey'>
                    <Pressable onPress={goBack}>
                      <ArrowBackIcon size='6' color='white' />
                    </Pressable>
                  </Box>
                  <Pressable onPress={() => this.takePicture(camera)} bg='spars.green2' p='5' borderRadius='100'>
                    <CircleIcon color='white' size='md' />
                  </Pressable>
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

export default TakePhoto;