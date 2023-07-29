import React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import PostAPI from '@api/PostAPI';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RootStackParamList } from '@/types/NavigatorTypes';
import Typography from '@components/typography/Typography';
import { DayProps } from 'react-native-calendars/src/calendar/day';
import Day from '@components/calendar/Day';
import { DateTimeFormatter, LocalDate } from '@js-joda/core';
import { Colors } from '@/styles';

type PropsType = NativeStackNavigationProp<RootStackParamList, 'MainTab'> & {};

function CalenderPage(props: PropsType) {
  const navigation = useNavigation();
  const [posts, setPosts] = useState({});

  const today = new Date().toISOString().split('T')[0];

  // DB 데이터 가져오기
  useEffect(() => {
    PostAPI.getPosts(setPosts);
  }, []);

  const handleDayPress = async (day) => {
    if (posts && day.dateString in posts) {
      navigation.navigate('PostRead', {
        date: day.dateString,
      });
    } else {
      navigation.navigate('PostWrite', {
        date: day.dateString,
      });
    }
  };

  // 오늘 날짜 포스트 작성
  const handleDirectBtn = async () => {
    navigation.navigate('PostWrite', { date: today });
  };

  // 포스트 된 날짜 데이터 가져오기
  const handlePostedDays = (posts) => {
    const result = {};
    if (posts) {
      for (const key in posts) {
        result[posts[key].date] = {
          post: posts[key],
          customStyles: {
            container: { backgroundColor: '#b088f9', width: '90%', height: 5, borderRadius: 3, alignSelf: 'center' },
            text: { color: 'black' },
          },
        };
      }
    }

    // today
    const today = LocalDate.now().format(DateTimeFormatter.ofPattern('yyyy-MM-dd')).toString();
    result[today] = {
      customStyles: {
        container: { backgroundColor: Colors.blue.s100, width: '90%', height: 5, borderRadius: 3, alignSelf: 'center' },
        text: { color: 'black' },
      },
    };

    return result;
  };

  const renderCustomDay = (dayProps: DayProps, date) => {
    return <Day dayProps={dayProps} />;
  };

  return (
    <View key="1" style={styles.container}>
      <View style={styles.calendar}>
        <Calendar
          style={{}}
          onDayPress={handleDayPress}
          markingType={'custom'}
          markedDates={handlePostedDays(posts)}
          theme={{
            contentStyle: {
              margin: 5,
            },
          }}
          dayComponent={renderCustomDay}
        />
        <TouchableOpacity onPress={handleDirectBtn} style={styles.todayButton}>
          <Typography size={20} bold color={Colors.white.s100}>
            오늘 일기 작성하기
          </Typography>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  todayButton: {
    width: '50%',
    height: 40,
    backgroundColor: Colors.blue.s200,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginRight: 'auto',
    marginLeft: 'auto',
    shadowColor: Colors.black.s100,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4.65,
    elevation: 6,
  },
  calendar: {
    flex: 3,
    paddingVertical: 30,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: '#bc6ff1',
    resizeMode: 'center',
  },
});

export default CalenderPage;
