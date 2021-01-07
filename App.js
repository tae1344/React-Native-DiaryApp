import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, Pressable } from 'react-native';
import CalendarPage from './source/components/Calender';
import PostPage from './source/components/Post';
import PostReadPage from './source/components/PostRead';
import PostListView from './source/components/PostListView';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

const Fonts = async () => await Font.loadAsync({
  CuteFontRegular: require('./source/assets/fonts/CuteFont-Regular.ttf'),
});

const Stack = createStackNavigator();


export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={Fonts}
        onFinish={() => setIsReady(true)}
        onError={console.warn}
      />
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Calendar"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ffffff',
          },
          headerTitleStyle: {
            fontFamily: 'CuteFontRegular',
            fontSize: 30
          }
        }}>
        <Stack.Screen
          name="Calendar"
          component={CalendarPage}
          options={{
            headerTitle: "다이어리 앱",
            headerTitleAlign: 'center',
            headerRight: () => (<Pressable onPress={() => alert('나중에 추가 될 기능이에요!')} title="Info"><Image style={styles.icon} source={require('./source/assets/options.png')} /></Pressable>)
          }} />
        <Stack.Screen name="Post" component={PostPage} options={{ headerTitle: '다이어리 작성...' }} />
        <Stack.Screen name="PostRead" component={PostReadPage}
          options={{
            headerTitle: '작성한 일기 ...',
            headerTitleAlign: 'center',
          }} />
        {/* <Stack.Screen name="PostList" component={PostListView} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: 'black',
    resizeMode: 'center',
    marginRight: 10
  },

});
