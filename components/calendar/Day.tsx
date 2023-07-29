import { DayProps } from 'react-native-calendars/src/calendar/day';
import { DateData } from 'react-native-calendars';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useMemo } from 'react';
import Typography from '@components/typography/Typography';
import { Colors } from '@/styles';
import { useNavigation } from '@react-navigation/native';

type PropsType = {
  dayProps: DayProps & { date?: DateData };
};
export default function Day({ dayProps, date }: PropsType) {
  const navigation = useNavigation();

  const onPressDay = () => {
    if (dayProps.marking) {
      navigation.navigate('PostWrite', { post: dayProps.marking?.post });
    } else {
      navigation.navigate('PostWrite', { date: dayProps.date.dateString });
    }
  };

  const markingStyle = useMemo(() => {
    if (dayProps.marking) {
      return { ...dayProps.marking.customStyles.container };
    }
  }, [dayProps.marking]);

  const textStyle = useMemo(() => {
    if (dayProps.marking) {
      return {
        ...dayProps.marking.customStyles.text,
      };
    }

    return dayProps.state === 'disabled' ? styles.disable : {};
  }, [dayProps.state]);

  return (
    <TouchableOpacity disabled={dayProps.state === 'disabled'} onPress={onPressDay} style={[styles.layout]}>
      <Typography size={16} style={textStyle}>
        {dayProps.date?.day}
      </Typography>
      <View style={markingStyle} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  layout: {
    width: '98%',
    aspectRatio: 0.78,
    borderWidth: 0.2,
    borderColor: Colors.gray.s300,
  },
  disable: {
    color: Colors.gray.s200,
  },
});
