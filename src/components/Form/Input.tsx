import React, { FC } from 'react';
import {
  FormControl,
  IFormControlProps,
  Input as InputNB,
  IInputProps,
  Stack,
  Text,
  WarningOutlineIcon
} from 'native-base';

interface InputProps extends IFormControlProps {
  inputProps?: Partial<IInputProps>,
  label?: string,
  placeholder?: string,
  helper?: string,
  error?: string,
  value?: string,
  onChangeText?: (text: string) => void
}

const Input: FC<InputProps> = ({ inputProps, placeholder, label, helper, error, value, onChangeText, ...props }) => {
  return (
    <FormControl {...props}>
      <Stack
        bg={'spars.lightgrey'}
        borderWidth={1}
        borderColor={'spars.darkgrey'}
        borderRadius={8}
        px={'25px'}
        py={'11px'}>
        {!!label && <FormControl.Label m={0}>
          <Text fontSize={12} color={'spars.grey'}>{ label }</Text>
        </FormControl.Label>}
        <InputNB
          {...inputProps}
          value={value || inputProps?.value}
          onChangeText={onChangeText || inputProps?.onChangeText}
          placeholder={placeholder || inputProps?.placeholder}
          bold
          fontSize='16'
          borderWidth={0}
          p={0} />
      </Stack>
      <Stack>
        {!!helper && <FormControl.HelperText>{helper}</FormControl.HelperText>}
        {!!error && <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {error}
        </FormControl.ErrorMessage>}
      </Stack>
    </FormControl>
  );
}

export default Input;