import React, { useState } from 'react';
import { Platform, SafeAreaView, StyleSheet } from 'react-native';

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import Navigator from '@navigator/Navigator';

const Fonts = async () =>
  await Font.loadAsync({
    GothicRegular: Platform.OS === 'ios' ? 'AppleSDGothicNeo-Regular' : 'sans-serif',
  });

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return <AppLoading startAsync={Fonts} onFinish={() => setIsReady(true)} onError={console.warn} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Navigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: 'black',
    resizeMode: 'center',
    marginRight: 10,
  },
});
