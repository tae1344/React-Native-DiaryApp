import styled from '@emotion/native';
import { Platform, TextStyle } from 'react-native';

type TextPropsType = TextStyle & {
  size?: number;
  bold?: boolean;
};

const Typography = styled.Text<TextPropsType>((props) => {
  let fontFamily = Platform.OS === 'ios' ? 'AppleSDGothicNeo-Regular' : 'sans-serif';
  if (props.bold) {
    fontFamily = Platform.OS === 'ios' ? 'AppleSDGothicNeo-Bold' : 'sans-serif';
  }

  const getLetterSpace = () => {
    const size = props.fontSize ?? props.size;
    if (size <= 11) {
      return -0.2;
    }

    if (size > 11 && size <= 13) {
      return -0.3;
    }

    if (size >= 14 && size <= 15) {
      return -1.0;
    }

    if (size >= 16 && size < 17) {
      return -0.4;
    }

    if (size >= 17 && size <= 20) {
      return -0.9;
    }

    if (size > 20) {
      return -1.1;
    }
  };

  return {
    color: props.color ?? '#303030',
    fontSize: props.size ?? 14,
    fontWeight: props.bold ? 'bold' : '400',
    fontFamily: fontFamily,
    letterSpacing: getLetterSpace(),
  };
});

export default Typography;
