import React, { useEffect, useMemo } from 'react';
import { Image, Pressable, StyleSheet, View, ViewProps } from 'react-native';
import Typography from '@components/typography/Typography';
import { useNavigation } from '@react-navigation/native';
import CommStatusBar from '@components/CommStatusBar';
import { Colors } from '@/styles';

type PropsType = {
  title?: string;
  naviType?: 'close' | 'back';
  underLine?: boolean;
  rightButton?: () => JSX.Element;
};

function Header(props: PropsType) {
  const navigation = useNavigation();

  const underLineStyle = useMemo(() => {
    return props.underLine ? styles.underLine : {};
  }, [props.underLine]);

  const getNaviIcon = () => {
    if (props.naviType) {
      return props.naviType === 'close'
        ? require('@assets/images/navi/navi-icon-close.png')
        : require('@assets/images/navi/navi-icon-back.png');
    } else {
      return require('@assets/images/navi/navi-icon-back.png');
    }
  };

  const onPressNavi = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <CommStatusBar />
      <View style={[styles.header, underLineStyle]}>
        <Pressable style={styles.topLeft} onPress={onPressNavi}>
          <Image source={getNaviIcon()} />
        </Pressable>
        <View style={styles.title}>
          <Typography size={20} style={{ width: '60%', textAlign: 'center' }} numberOfLines={1}>
            {props.title ?? ''}
          </Typography>
        </View>
        {props.rightButton && <View style={styles.topRight}>{props.rightButton()}</View>}
      </View>
    </View>
  );
}

Header.defaultProps = {
  title: '',
  naviType: 'back',
  underLine: true,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 56,
    backgroundColor: 'white',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  underLine: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray.s100,
  },
  title: {
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topLeft: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 3,
    left: 0,
    zIndex: 2,
  },
  topRight: {
    width: 50,
    height: 50,
    position: 'absolute',
    top: 3,
    right: 0,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
