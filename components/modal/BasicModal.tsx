import Modal from 'react-native-modal';
import { Image, Pressable, StyleSheet, View } from 'react-native';
import React, { ForwardedRef, forwardRef, useImperativeHandle, useState } from 'react';
import { Colors } from '@/styles';

type PropsType = {
  ref: ForwardedRef<any>;
  children: JSX.Element | JSX.Element[];
};

const BasicModal = forwardRef((props: PropsType, ref: ForwardedRef<any>) => {
  const [isVisible, setIsVisible] = useState(false);

  useImperativeHandle(
    ref,
    () => ({
      open: () => {
        onChangeVisible(true);
      },
      close: () => {
        onChangeVisible(false);
      },
    }),
    []
  );

  const onChangeVisible = (isVisible: boolean) => {
    setIsVisible(isVisible);
  };

  return (
    <Modal
      style={styles.container}
      isVisible={isVisible}
      hasBackdrop={true}
      coverScreen={false}
      backdropOpacity={0.3}
      backdropTransitionOutTiming={0}
      onBackButtonPress={() => onChangeVisible(false)}
      onBackdropPress={() => onChangeVisible(false)}
    >
      <View style={styles.content}>
        {/*<Pressable style={styles.closeBtn} onPress={() => {}}>*/}
        {/*  <Image source={require('@assets/images/navi/navi-icon-close.png')} />*/}
        {/*</Pressable>*/}
        {props.children}
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0,
    justifyContent: 'flex-end',
  },
  content: {
    backgroundColor: Colors.white.s100,
    paddingTop: 20,
    paddingHorizontal: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  closeBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 10,
    alignSelf: 'flex-start',
  },
});

export default BasicModal;
