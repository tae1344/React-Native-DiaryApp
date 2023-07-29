import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import PostAPI from '@api/PostAPI';
import ImageAPI from '@api/ImageAPI';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { proxy } from 'valtio';
import ImageUpload from '@components/ImageUpload';
import Header from '@components/ui/Header';
import TextInputBox from '@components/typography/TextInputBox';
import { Colors } from '@/styles';
import Divider from '@components/ui/Divider';
import Post from '@/entity/post/Post';

type RouteProps = RouteProp<{
  params: {
    post?: Post;
    date?: string;
  };
}>;

type PropsType = {};

type StateType = {
  mode: 'create' | 'update';
  images: Array<object | string>;
  selectedImage: {
    uri: string;
    name: string;
  };
  updateImageURL: string;
};

export default function PostWrite(props: PropsType) {
  const route = useRoute<RouteProps>();
  const navigation = useNavigation();

  const state = useRef(
    proxy<StateType>({
      mode: 'create',
      images: [],
      selectedImage: {
        uri: '',
        name: '',
      },
      updateImageURL: '',
    })
  ).current;

  const [textInput, setTextInput] = useState<string>('');

  useEffect(() => {
    if (route.params && route.params.post) {
      setTextInput(route.params.post.content);
      state.mode = 'update';
      state.updateImageURL = route.params.post.imageURL;
    } else {
      state.mode = 'create';
    }
  }, [route.params]);

  const handleSubmit = async () => {
    const date = state.mode === 'create' ? route.params.date : route.params.post.date;
    await PostAPI.createPost(textInput, date, state.selectedImage);

    if (state.selectedImage.uri) {
      await ImageAPI.uploadImage(date, state.selectedImage);
    }

    navigation.goBack();
  };

  const updateImages = (values: object[]) => {
    state.images = values;
  };

  const renderConfirmButton = () => {
    return (
      <TouchableOpacity onPress={handleSubmit} style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Image style={styles.icon} source={require('@assets/confirm.png')} />
      </TouchableOpacity>
    );
  };

  const title = useMemo(() => {
    return state.mode === 'create' ? '작성' : '수정';
  }, [state.mode]);

  return (
    <View style={styles.container}>
      <Header title={title} naviType={'back'} rightButton={renderConfirmButton} />
      <View style={styles.contentLayout}>
        <TextInputBox
          style={styles.textInput}
          value={textInput}
          multiline={true}
          textAlignVertical="top"
          placeholder={`하루를 기록해보세요`}
          onChangeText={(text) => setTextInput(text)}
        />

        <Divider />

        <View style={styles.imageSelectLayout}>
          <ImageUpload images={state.images} updateImageState={updateImages} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: Colors.white.s100,
  },
  contentLayout: {
    flex: 1,
  },
  imageSelectLayout: {
    flex: 0.5,
    margin: 16,
  },
  textInput: {
    marginTop: 15,
    marginLeft: 15,
    marginRight: 15,
    marginBottom: 15,
  },
  icon: {
    width: 30,
    height: 25,
    marginHorizontal: 10,
    tintColor: Colors.black.s200,
    resizeMode: 'center',
  },
});
