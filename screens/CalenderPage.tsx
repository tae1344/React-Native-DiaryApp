import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Image } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import ViewPager from '@react-native-community/viewpager';
import PostListPage from '@components/PostListView';
import PostAPI from '@api/PostAPI';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from 'react-native-screens/native-stack';
import { RootStackParamList } from '@/types/NavigatorTypes';

type PropsType = NativeStackNavigationProp<RootStackParamList, 'MainTab'> & {};

function CalenderPage(props: PropsType) {
  const navigation = useNavigation();
  const [posts, setPosts] = useState({});

  const today = new Date().toISOString().split('T')[0];

  // DB 데이터 가져오기
  useEffect(() => {
    PostAPI.getPosts(setPosts);
  }, []);

  console.log('posts ::', posts);

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
          selected: true,
          marked: true,
          customStyles: {
            container: { backgroundColor: '#b088f9' },
            text: { color: 'black' },
          },
        };
      }
    }
    return result;
  };

  return (
    <ViewPager style={styles.viewPager} initialPage={0}>
      <View key="1" style={styles.container}>
        <View style={styles.calendar}>
          <Calendar
            onDayPress={handleDayPress}
            markingType={'custom'}
            markedDates={handlePostedDays(posts)}
            theme={{
              'stylesheet.calendar.header': {
                monthText: {
                  fontSize: 30,
                  fontWeight: '600',
                  color: 'black',
                  margin: 20,
                  fontFamily: 'GothicRegular',
                },
              },
              calendarBackground: '#ffffff',
              textDayFontFamily: 'GothicRegular',
              textDayHeaderFontFamily: 'GothicRegular',
              textMonthFontFamily: 'GothicRegular',
              textDayFontSize: 20,
            }}
          />
          <View style={styles.subContainer}>
            <TouchableOpacity onPress={handleDirectBtn}>
              <Image style={styles.icon} source={require('@assets/plus-solid.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View key="2">
        <PostListPage navigation={navigation} posts={posts} />
      </View>
    </ViewPager>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  subContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    marginRight: 'auto',
    marginBottom: 0,
    marginLeft: 'auto',
    shadowColor: '#000',
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
  viewPager: {
    flex: 1,
  },
});

export default CalenderPage;
