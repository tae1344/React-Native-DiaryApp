import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Pressable, Image, Platform } from 'react-native';


import * as ImagePicker from 'expo-image-picker';
import * as api from '../api/firebaseAPI';

// 시간 버튼, 이미지 버튼(imagePicker), 확인 버튼
// 상태 이모티콘, 날짜, 요일 + 내용

export default function Post({ navigation, route }) {
  const { selectedDay, mode, content } = route.params; // 앞 화면에서 받아온 파라미터 사용
  const [textInput, setTextInput] = useState(content); //포스트 텍스트 정보
  const [selectedImage, setSelectedImage] = useState(""); // 선택한 이미지 정보

  //console.log('test :::', Boolean(selectedImage));

  // ------------------  Image Picker API Config -------

  const handleImagePicker = async () => {

    if (Platform.OS !== 'web') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    // 선택한 사진 데이터 설정
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1, // 압축 최대로
    });

    const uriSlice = pickerResult.uri.split('/');
    const imageName = uriSlice[uriSlice.length - 1];

    if (!pickerResult.cancelled) {
      setSelectedImage({ uri: pickerResult.uri, name: imageName });
    } else {
      setSelectedImage({ uri: "", name: "" });
    }


  }

  // ------------------ END ---------------------------------



  // 포스트 전송 이벤트
  const handleSubmit = async (textInput, selectedDay, selectedImage) => {
    await api.createPost(textInput, selectedDay, selectedImage);

    if (selectedImage) {
      await api.uploadImage(selectedDay, selectedImage);
    }
    navigation.popToTop();
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedDay}</Text>
      <View style={styles.textArea}>
        {Platform.OS === 'android' &&
          <TextInput
            style={styles.textInput}
            value={textInput}
            multiline={true}
            textAlignVertical="top"
            onChangeText={text => setTextInput(text)}
          />
        }
        {selectedImage ?
          (<View style={styles.container}>
            <Image
              source={{ uri: selectedImage.uri }}
              style={styles.thumbnail}
            />
          </View>
          ) : null
        }
        {/* 하단 메뉴바 */}
        <View style={styles.menuBar}>
          <TouchableOpacity onPress={handleImagePicker}>
            <Image style={styles.icon} source={require('../assets/upload.png')} />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => handleSubmit(textInput, selectedDay, selectedImage)} >
            <Image style={styles.icon} source={require('../assets/confirm.png')} />
          </TouchableOpacity>
        </View>
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
  textArea: {
    flex: 8,

  },
  textInput: {
    flex: 3,
    borderColor: 'gray',
    borderWidth: 1,
    fontFamily: 'CuteFontRegular',
    fontSize: 30,

  },
  title: {
    color: 'black',
    padding: 20,
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'CuteFontRegular',
    backgroundColor: '#ffffff'
  },
  icon: {
    width: 30,
    height: 25,
    marginHorizontal: 10,
    marginTop: 20,
    tintColor: '#ffd5cd',
    resizeMode: 'center',
  },
  menuBar: {
    flex: .5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',

  },
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: "contain"
  }
})