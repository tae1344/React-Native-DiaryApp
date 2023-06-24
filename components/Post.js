import React, { useState } from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import PostAPI from "@api/PostAPI";
import ImageAPI from "@api/ImageAPI";

// 시간 버튼, 이미지 버튼(imagePicker), 확인 버튼
// 상태 이모티콘, 날짜, 요일 + 내용

export default function Post({ navigation, route }) {
  const { selectedDay, mode, readPostData, imageURL } = route.params; // 앞 화면에서 받아온 파라미터 사용
  const [textInput, setTextInput] = useState(
    readPostData ? readPostData.content : ""
  ); //포스트 텍스트 정보
  const [selectedImage, setSelectedImage] = useState({ uri: "", name: "" }); // 선택한 이미지 정보
  const [updateImageURL, setUpdateImageURL] = useState(imageURL); // 포스트 작성시 저장했던 이미지 정보

  const handleImagePicker = async () => {
    if (Platform.OS !== "web") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }

    // 선택한 사진 데이터 설정
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1, // 압축 최대로
    });

    const uriSlice = pickerResult.uri.split("/");
    const imageName = uriSlice[uriSlice.length - 1];

    if (!pickerResult.cancelled) {
      setSelectedImage({ uri: pickerResult.uri, name: imageName });
    } else {
      setSelectedImage({ uri: "", name: "" });
    }
  };

  // 포스트 전송 이벤트
  const handleSubmit = async (textInput, selectedDay, selectedImage) => {
    await PostAPI.createPost(textInput, selectedDay, selectedImage);

    if (selectedImage.uri) {
      await ImageAPI.uploadImage(selectedDay, selectedImage);
    }

    navigation.popToTop();
  };

  // 취소 버튼 이벤트
  const handleCancle = () => {
    console.log("Cancel!!");
    setSelectedImage({ uri: "", name: "" });
  };

  const handledeleteImage = async () => {
    await ImageAPI.deleteImage(selectedDay, readPostData);
    setUpdateImageURL("");
    setSelectedImage({ uri: "", name: "" });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedDay}</Text>
      <View style={styles.textArea}>
        {Platform.OS === "android" && (
          <TextInput
            style={styles.textInput}
            value={textInput}
            multiline={true}
            textAlignVertical="top"
            onChangeText={(text) => setTextInput(text)}
          />
        )}
        {selectedImage.uri ? (
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <TouchableOpacity
                style={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
                onPress={() => handleCancle()}
              >
                <Image
                  style={styles.cancelIcon}
                  source={require("../assets/cancel.png")}
                />
              </TouchableOpacity>
              <Image
                source={{ uri: selectedImage.uri }}
                style={styles.thumbnail}
              />
            </View>
          </View>
        ) : null}
        {updateImageURL ? (
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <TouchableOpacity
                style={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
                onPress={handledeleteImage}
              >
                <Image
                  style={styles.cancelIcon}
                  source={require("../assets/cancel.png")}
                />
              </TouchableOpacity>
              <Image
                source={{ uri: updateImageURL }}
                style={styles.thumbnail}
              />
            </View>
          </View>
        ) : null}
        {/* 하단 메뉴바 */}
        <View style={styles.menuBar}>
          <TouchableOpacity onPress={handleImagePicker}>
            <Image
              style={styles.icon}
              source={require("../assets/upload.png")}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleSubmit(textInput, selectedDay, selectedImage)}
          >
            <Image
              style={{ ...styles.icon, tintColor: "#bc6ff1" }}
              source={require("../assets/confirm.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
  },
  imageContainer: {
    marginTop: 10,
    marginLeft: 10,
    backgroundColor: "#eeeeee",
    width: 100,
    height: 100,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  textArea: {
    flex: 8,
  },
  textInput: {
    flex: 3,
    borderColor: "rgba(0, 0, 0, 0.1)",
    borderWidth: 1,
    fontFamily: "CuteFontRegular",
    fontSize: 30,
  },
  title: {
    color: "black",
    padding: 20,
    textAlign: "center",
    fontSize: 30,
    fontFamily: "CuteFontRegular",
    backgroundColor: "#ffffff",
  },
  icon: {
    width: 30,
    height: 25,
    marginHorizontal: 10,
    marginTop: 20,
    tintColor: "#000000",
    resizeMode: "center",
  },
  cancelIcon: {
    width: 30,
    height: 30,
    tintColor: "rgba(0, 0, 0, 0.3)",
    resizeMode: "center",
  },
  menuBar: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.1)",
  },
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
});
