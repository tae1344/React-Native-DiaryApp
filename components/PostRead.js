import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Alert,
} from "react-native";
import PostAPI from "@api/PostAPI";
import ImageAPI from "@api/ImageAPI";

export default function PostRead({ navigation, route }) {
  const { selectedDay, mode } = route.params;
  const [readPostData, setReadPostData] = useState(""); // 작성한 포스트 정보(글, 이미지)
  const [toggleView, setToggleView] = useState(false); // 토글 메뉴창
  const [imageURL, setImageURL] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    PostAPI.getOnePost(selectedDay, setReadPostData);
  }, []);

  useEffect(() => {
    if (readPostData.imageName) {
      ImageAPI.getImage(selectedDay, readPostData, setImageURL);
    }
  }, [readPostData]);

  useEffect(() => {
    // 네이게이션 헤더 설정
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={handleDotsPress}>
          <Image style={styles.icon} source={require("../assets/more.png")} />
        </TouchableOpacity>
      ),
    });
  }, [toggleView]); // toggle state가 변할때마다 작동하도록 설정해, 기능을 완성함

  // 3 Dots 클릭 이벤트
  const handleDotsPress = () => {
    setToggleView(!toggleView);
  };
  // 포스트 수정
  const handleUpdateMode = () => {
    navigation.navigate("Post", {
      selectedDay: selectedDay,
      mode: "update",
      readPostData: readPostData,
      imageURL: imageURL,
    });
  };
  // 포스트 삭제
  const handleDelete = async () => {
    await PostAPI.deletePost(selectedDay);
    await ImageAPI.deleteImage(selectedDay, readPostData);
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      {toggleView ? (
        <View style={styles.toggleView}>
          <TouchableOpacity style={styles.menu} onPress={handleUpdateMode}>
            <Image
              style={{ ...styles.icon }}
              source={require("../assets/edit.png")}
            />
            <Text>수정하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menu} onPress={handleDelete}>
            <Image
              style={{ ...styles.icon, tintColor: "#f05454" }}
              source={require("../assets/trash.png")}
            />
            <Text style={{ color: "#f05454" }}>삭제</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <View style={styles.header}>
        <Text style={styles.title}>{selectedDay}</Text>
      </View>
      <View style={styles.textArea}>
        <Text style={styles.content}>{readPostData.content}</Text>
        {setModalVisible ? (
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Image
                  style={{ ...styles.thumbnail, width: 300, height: 300 }}
                  source={imageURL ? { uri: imageURL } : null}
                />
              </View>
            </View>
          </Modal>
        ) : null}
      </View>
      {imageURL ? (
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Image
              style={styles.thumbnail}
              source={imageURL ? { uri: imageURL } : null}
            />
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#ffffff",
  },
  header: {
    flex: 1,
  },
  title: {
    color: "black",
    padding: 20,
    textAlign: "center",
    fontSize: 30,
    fontFamily: "CuteFontRegular",
  },
  textArea: {
    flex: 6,
    alignContent: "center",
  },
  content: {
    fontSize: 30,
    fontFamily: "CuteFontRegular",
  },
  icon: {
    width: 30,
    height: 20,
    marginRight: 10,
    tintColor: "#000000",
    resizeMode: "center",
  },
  menu: {
    flex: 1,
    flexDirection: "row",
    padding: 10,
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
    backgroundColor: "#ffffff",
    alignContent: "center",
    justifyContent: "center",
    borderRadius: 10,
    position: "absolute",
    top: 0,
    right: 5,
  },
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  imageContainer: {
    marginVertical: 10,
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
  modalView: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
