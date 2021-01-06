import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, StatusBar } from 'react-native';

import * as api from '../api/firebaseAPI';

export default function PostRead({ navigation, route }) {
  const { selectedDay, mode } = route.params;
  const [readPostData, setReadPostData] = useState(""); // 작성한 포스트 정보(글, 이미지)
  const [toggleView, setToggleView] = useState(false); // 토글 메뉴창
  const [imageURL, setImageURL] = useState("");


  useEffect(() => {
    api.getOnePost(selectedDay, setReadPostData);

  }, []);

  useEffect(() => {
    if (readPostData.imageName) {
      api.getImage(selectedDay, readPostData, setImageURL);
    }
  }, [readPostData]);


  //console.log("imageURL ::::", imageURL);

  useEffect(() => {
    // 네이게이션 헤더 설정
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleDotsPress} >
          <Image style={styles.icon} source={require('../assets/more.png')} />
        </TouchableOpacity>
      )
    });
  }, [toggleView]); // toggle state가 변할때마다 작동하도록 설정해, 기능을 완성함


  // 3 Dots 클릭 이벤트
  const handleDotsPress = () => {
    setToggleView(!toggleView);
  }
  // 포스트 수정
  const handleUpdateMode = () => {
    navigation.navigate('Post', { selectedDay: selectedDay, mode: 'update', content: readPostData.content });
  }
  // 포스트 삭제
  const handleDelete = async () => {
    await api.deletePost(selectedDay);
    await api.deleteImage(selectedDay, readPostData);
    navigation.popToTop();
  }

  return (
    <View style={styles.container}>
      {toggleView ? (
        <View style={styles.toggleView}>
          <TouchableOpacity style={styles.menu} onPress={handleUpdateMode}>
            <Image style={styles.icon} source={require('../assets/edit.png')} />
            <Text>수정하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menu} onPress={handleDelete}>
            <Image style={styles.icon} source={require('../assets/trash.png')} />
            <Text>삭제</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <View style={styles.header}>
        <Text style={styles.title}>{selectedDay}</Text>
      </View>
      <View style={styles.textArea}>
        <Text style={styles.content}>{readPostData.content}</Text>
        <Image style={styles.thumbnail} source={imageURL ? { uri: imageURL } : null} />

      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff'
  },
  header: {
    flex: 1,
  },
  title: {
    color: 'black',
    padding: 20,
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'CuteFontRegular'
  },
  textArea: {
    flex: 6,

  },
  content: {
    fontSize: 30,
    fontFamily: 'CuteFontRegular'
  },
  icon: {
    width: 30,
    height: 20,
    marginRight: 10,
    tintColor: '#ffd5cd',
    resizeMode: 'center',
  },
  menu: {
    flex: 1,
    flexDirection: 'row',
    padding: 10
  },
  toggleView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    zIndex: 1,
    backgroundColor: '#ffffff',
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    position: 'absolute',
    top: 0,
    right: 5
  },
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: "contain"
  }
})