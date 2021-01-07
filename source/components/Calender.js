import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, StyleSheet, Text, Image } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import ViewPager from '@react-native-community/viewpager';
import PostListPage from './PostListView';


import * as api from '../api/firebaseAPI';

function CalenderPage({ navigation, route }) {
  const [posts, setPosts] = useState({});

  const today = new Date().toISOString().split('T')[0];


  // DB 데이터 가져오기
  useEffect(() => {
    api.getPosts(setPosts);
  }, []);

  console.log('posts ::', posts);

  // 선택 날짜 포스트 작성
  const handleDayPress = async (day) => {
    if (posts && day.dateString in posts) {
      // 읽기 모드(이미 포스트 작성된 날짜)
      navigation.navigate('PostRead', { selectedDay: day.dateString, mode: 'read' });
    } else {
      // 쓰기 모드 (포스트 된게 없는 날짜)
      navigation.navigate('Post', { selectedDay: day.dateString, mode: 'write' });
    }
  }

  // 오늘 날짜 포스트 작성
  const handleDirectBtn = async () => {
    navigation.navigate('Post', { selectedDay: today, mode: 'write' });
  }

  // 포스트 된 날짜 데이터 가져오기
  const handlePostedDays = (posts) => {
    let result = {};
    if (posts) {
      for (let key in posts) {
        result[posts[key].date] = {
          selected: true,
          marked: true,
          customStyles: {
            container: { backgroundColor: '#b088f9' },
            text: { color: 'black' }
          }
        };
      }
    }
    return result;
  }


  return (
    <ViewPager style={styles.viewPager} initialPage={0}>
      <View key="1" style={styles.container}>
        <View style={styles.calendar}>
          <Calendar
            onDayPress={handleDayPress}
            markingType={'custom'}
            markedDates={handlePostedDays(posts)}
            theme={{
              "stylesheet.calendar.header": {
                monthText: {
                  fontSize: 30,
                  fontWeight: "600",
                  color: 'black',
                  margin: 20,
                  fontFamily: 'CuteFontRegular'
                }
              },
              calendarBackground: '#ffffff',
              textDayFontFamily: 'CuteFontRegular',
              textDayHeaderFontFamily: 'CuteFontRegular',
              textMonthFontFamily: 'CuteFontRegular',
              textDayFontSize: 20,

            }}
          />
          <View style={styles.subContainer}>
            <TouchableOpacity onPress={handleDirectBtn}>
              <Image style={styles.icon} source={require('../assets/plus-solid.png')} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View key="2" >
        <PostListPage navigation={navigation} posts={posts} />
      </View>
    </ViewPager>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff'
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.20,
    shadowRadius: 4.65,
    elevation: 6,
  },
  calendar: {
    flex: 3,
    paddingVertical: 30

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

})

export default CalenderPage;