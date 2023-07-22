import React, { useEffect } from 'react';
import { DimensionValue, StyleSheet, View } from 'react-native';
import { Colors } from '@/styles';

type PropsType = {
  color?: string | undefined;
  height?: DimensionValue;
  marginLeft: number;
  marginRight: number;
  marginTop: number;
  marginBottom: number;
  transparent: boolean;
};

const Divider = (props: PropsType) => {
  useEffect(() => {
    console.log('props ', props);
  }, [props]);

  return (
    <View
      style={[
        {
          height: props.height,
          backgroundColor: props.color,
          marginLeft: props.marginLeft,
          marginRight: props.marginRight,
          marginTop: props.marginTop,
          marginBottom: props.marginBottom,
        },
        props.transparent ? styles.container : styles.defaultContainer,
      ]}
    />
  );
};

Divider.defaultProps = {
  height: 1,
  color: Colors.white.s300,
  marginLeft: 0,
  marginRight: 0,
  marginTop: 0,
  marginBottom: 0,
  transparent: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 1,
  },
  defaultContainer: {},
});

export default Divider;
