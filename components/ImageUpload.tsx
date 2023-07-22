import { Image, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
// import WebView from 'react-native-webview';
import React, { useContext, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import { ImageResult } from 'expo-image-manipulator';
// import ToastContext from '@context/toast/ToastContext';
import { proxy, useSnapshot } from 'valtio';

type PropsType = {
  images: Array<object | string>;
  updateImageState: (images: Array<object | string>) => void;
};

type StateType = {
  images: Array<object | string>;
  isAddImage: boolean;
};

const MAGINS_OF_ROW = 10 * 4;
const IMAGE_SIZE = Math.floor((350 - MAGINS_OF_ROW) / 5);
const MAX_IMAGE_AMOUNT = 10;

function ImageUpload(props: PropsType) {
  // const toast = useContext(ToastContext);
  // const webViewRef = useRef<HTMLWebViewElement>(null);

  const state = useRef(
    proxy<StateType>({
      images: [...props.images],
      isAddImage: true,
    })
  ).current;

  const snap = useSnapshot(state);

  useEffect(() => {
    state.images = props.images;
  }, [props.images]);

  const checkImageAmount = () => {
    if (state.images.length > MAX_IMAGE_AMOUNT - 1) {
      if (!state.isAddImage) {
        // toast.show(`최대 ${MAX_IMAGE_AMOUNT}장의 사진만 등록 가능합니다.`);
        return;
      }

      state.isAddImage = false;
      // toast.show(`최대 ${MAX_IMAGE_AMOUNT}장의 사진만 등록 가능합니다.`);
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    await Camera.requestCameraPermissionsAsync();
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: false,
      aspect: [4, 3],
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      const { uri }: ImageResult = await ImageManipulator.manipulateAsync(
        result.assets[0].uri,
        [{ resize: { width: 1080 } }],
        { compress: 0.5 }
      );
      const image = [uri];

      if (checkImageAmount()) {
        state.images = [...state.images, ...image];
        props.updateImageState(state.images);
      }
    }
  };

  const deleteImage = (index: number) => {
    const imageTmp = [...state.images];
    imageTmp.splice(index, 1);
    state.images = imageTmp;
    state.isAddImage = imageTmp.length < MAX_IMAGE_AMOUNT;
    props.updateImageState(state.images);
  };

  return (
    <View style={[{ flex: 1, flexDirection: 'row', marginTop: 5 }]}>
      {/*{Platform.OS === 'android' ? (*/}
      <View style={[styles.imageMore, { borderRadius: 5, borderWidth: 1 }]}>
        <TouchableOpacity
          style={{
            width: IMAGE_SIZE,
            height: IMAGE_SIZE,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            pickImage();
          }}
        >
          <Image style={{ width: 30, height: 30 }} source={require('@assets/images/plusIcon/ic-more.png')} />
        </TouchableOpacity>
      </View>
      {/*) : (*/}
      {/*<View style={[styles.imageMore]}>*/}
      {/*  <WebView*/}
      {/*    overScrollMode={'never'}*/}
      {/*    androidLayerType={'hardware'}*/}
      {/*    ref={webViewRef}*/}
      {/*    originWhitelist={['*']}*/}
      {/*    domStorageEnabled={true}*/}
      {/*    allowFileAccess={true}*/}
      {/*    allowUniversalAccessFromFileURLs={true}*/}
      {/*    allowFileAccessFromFileURLs={true}*/}
      {/*    showsHorizontalScrollIndicator={false}*/}
      {/*    showsVerticalScrollIndicator={false}*/}
      {/*    source={{ uri: global.defSslApiUrl + '/v3/posts/button-html' }}*/}
      {/*    useWebKit={true}*/}
      {/*    style={[*/}
      {/*      {*/}
      {/*        maxHeight: IMAGE_SIZE,*/}
      {/*        maxWidth: IMAGE_SIZE,*/}
      {/*      },*/}
      {/*    ]}*/}
      {/*    onMessage={(event) => {*/}
      {/*      const data = JSON.parse(event.nativeEvent.data);*/}
      {/*      if (Object.prototype.hasOwnProperty.call(data, 'fileNumber') && data.fileNumber !== undefined) {*/}
      {/*        return;*/}
      {/*      }*/}

      {/*      if (!Object.prototype.hasOwnProperty.call(data, 'fileNumber') && checkImageAmount()) {*/}
      {/*        state.images = [...state.images, data];*/}
      {/*        props.updateImageState(state.images);*/}
      {/*      }*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</View>*/}
      {/*)}*/}

      <ScrollView
        overScrollMode={'never'}
        style={[styles.imageContainer]}
        decelerationRate={'fast'}
        keyboardShouldPersistTaps="handled"
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
      >
        {state.images && state.images.length > 0
          ? state.images.map((item: object, index: number) => {
              return (
                <View key={index}>
                  <Image
                    source={{
                      uri: typeof item === 'string' ? item : item.uri,
                    }}
                    style={styles.image}
                  />
                  <TouchableOpacity
                    style={styles.btnImageDel}
                    onPress={() => {
                      deleteImage(index);
                    }}
                  >
                    <Image source={require('@assets/images/closeIcon/btn_delete.png')} />
                  </TouchableOpacity>
                </View>
              );
            })
          : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    marginLeft: 2,
    flexWrap: 'wrap',
  },
  image: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(0, 0, 0, 0.08)',
    backgroundColor: '#f3f3f3',
    borderWidth: 1,
    borderRadius: 5,
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    marginRight: 10,
    marginTop: 10,
  },
  imageMore: {
    borderColor: 'rgba(0, 0, 0, 0.08)',
    backgroundColor: '#f3f3f3',
    borderWidth: 0,
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    marginRight: 10,
    marginTop: 10,
  },
  btnImageDel: {
    position: 'absolute',
    right: 3,
    top: 5,
    zIndex: 2,
  },
});

export default ImageUpload;
