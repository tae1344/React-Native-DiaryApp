import React, { ForwardedRef, forwardRef } from 'react';
import { Platform, StyleSheet, TextInput, TextInputProps } from 'react-native';
import { Colors } from '@/styles';

type PropsType = TextInputProps & {
  ref?: ForwardedRef<any>;
};

const TextInputBox = forwardRef((props: PropsType, ref: ForwardedRef<any>) => {
  return (
    <>
      <TextInput
        {...props}
        ref={props.ref}
        style={[styles.default, props.style]}
        autoCapitalize="none"
        placeholderTextColor={Colors.gray.s300}
        underlineColorAndroid="transparent"
        selectionColor={Colors.gray.s200}
        numberOfLines={1}
      />
    </>
  );
});

const styles = StyleSheet.create({
  default: {
    flex: 1,
    fontSize: 17,
    fontFamily: Platform.OS === 'ios' ? 'AppleSDGothicNeo-Regular' : 'sans-serif',
  },
});

export default TextInputBox;
