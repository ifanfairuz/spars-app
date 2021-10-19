import React, { FC, PropsWithChildren, useState } from 'react';
import { Pressable, Text, VStack, ChevronDownIcon, ChevronRightIcon } from 'native-base';
import Collapsible, { CollapsibleProps } from 'react-native-collapsible';
import { IVStackProps } from 'native-base/lib/typescript/components/primitives/Stack/VStack';

export interface CollapseInfoProps extends IVStackProps {
  label: string,
  autoOpen?: boolean,
  collapseProps?: Partial<CollapsibleProps>
}

const CollapseInfo: FC<PropsWithChildren<CollapseInfoProps>> = ({ label, collapseProps, autoOpen, children, ...props }) => {
  const [collapsed, setCollapsed] = useState(!autoOpen);
  return (
    <VStack {...props}>
      <Pressable
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
        onPress={() => setCollapsed(!collapsed)}>
        <Text bold fontSize='md'>{label}</Text>
        { collapsed ? (
          <ChevronRightIcon size='md' color='spars.orange' />
        ) : (
          <ChevronDownIcon size='md' color='spars.orange' />
        ) }
      </Pressable>
      <Collapsible {...collapseProps} collapsed={collapsed}>
        {children}
      </Collapsible>
    </VStack>
  );
}

export default CollapseInfo;