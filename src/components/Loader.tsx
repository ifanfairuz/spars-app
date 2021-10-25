import React, { FC, PropsWithChildren } from 'react';
import { Spinner, HStack, Heading, Center, ICenterProps } from "native-base"
import { useWindowDimensions } from 'react-native';

export interface LoaderProps extends PropsWithChildren<ICenterProps> {
  show: boolean
}

export const Loader: FC<LoaderProps> = ({ children, show, ...props }) => {
  const dimension = useWindowDimensions();

  if (!show) return null;
  return (
    <Center position='absolute' w={dimension.width} h={dimension.height} bg='rgba(0,0,0,0.6)' zIndex={10} {...props}>
      <HStack space={2} alignItems="center">
        <Spinner accessibilityLabel="Loading posts" color='spars.green2' />
        <Heading color="spars.green2" fontSize="lg">
          { children || 'Loading' }
        </Heading>
      </HStack>
    </Center>
  )
}

export default Loader;