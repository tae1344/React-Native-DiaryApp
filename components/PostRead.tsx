import React, { useEffect, useRef } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import PostAPI from '@api/PostAPI';
import ImageAPI from '@api/ImageAPI';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { proxy, useSnapshot } from 'valtio';
import Header from '@components/ui/Header';
import BasicModal from '@components/modal/BasicModal';
import Typography from '@components/typography/Typography';
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
  post: Post;
  toggleView: boolean;
  imageURL: string;
  modalVisible: boolean;
};

export default function PostRead(props: PropsType) {
  const modalRef = useRef(null);
  const route = useRoute<RouteProps>();
  const navigation = useNavigation();

  const state = useRef(
    proxy<StateType>({
      post: new Post(),
      toggleView: false,
      imageURL: '',
      modalVisible: false,
    })
  ).current;

  const snap = useSnapshot(state);

  useEffect(() => {
    PostAPI.getOnePost(route.params.date, (data) => {
      console.log('post >>> ', data);
      state.post = data;
    });
  }, []);

  useEffect(() => {
    if (state.post.imageName) {
      ImageAPI.getImage(route.params.date, state.post, (url) => (state.imageURL = url));
    }
  }, [state.post]);

  const handleDotsPress = () => {
    modalRef.current && modalRef.current.open();
  };

  const handleUpdateMode = () => {
    navigation.navigate('PostWrite', {
      post: state.post,
    });
  };

  const handleDelete = async () => {
    await PostAPI.deletePost(route.params.date);
    await ImageAPI.deleteImage(route.params.date, state.post);
    navigation.goBack();
  };

  const renderHeaderRight = () => {
    return (
      <TouchableOpacity onPress={handleDotsPress}>
        <Image style={styles.icon} source={require('@assets/more.png')} />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Header title={route.params.date} naviType={'back'} rightButton={renderHeaderRight} />
      <View style={styles.textArea}>
        <Typography size={16}>{state.post.content}</Typography>
      </View>
      {state.imageURL ? (
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={() => (state.modalVisible = true)}>
            <Image style={styles.thumbnail} source={state.imageURL ? { uri: state.imageURL } : null} />
          </TouchableOpacity>
        </View>
      ) : null}

      <BasicModal ref={modalRef}>
        <View style={styles.toggleView}>
          <TouchableOpacity style={styles.menu} onPress={handleUpdateMode}>
            <Image style={{ ...styles.icon }} source={require('@assets/edit.png')} />
            <Typography size={16}>수정하기</Typography>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity style={styles.menu} onPress={handleDelete}>
            <Image style={{ ...styles.icon, tintColor: '#f05454' }} source={require('@assets/trash.png')} />
            <Typography size={16} color={'#f05454'}>
              삭제
            </Typography>
          </TouchableOpacity>
        </View>
      </BasicModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
  },
  header: {
    flex: 1,
  },
  title: {
    color: 'black',
    padding: 20,
    textAlign: 'center',
    fontSize: 30,
    fontFamily: 'GothicRegular',
  },
  textArea: {
    flex: 1,
    padding: 16,
  },
  icon: {
    width: 30,
    height: 20,
    marginRight: 10,
    tintColor: '#000000',
    resizeMode: 'contain',
  },
  menu: {
    flexDirection: 'row',
    paddingVertical: 16,
    marginBottom: 2,
  },
  toggleView: {
    zIndex: 1,
    backgroundColor: '#ffffff',
    alignContent: 'center',
    justifyContent: 'center',
  },
  thumbnail: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  imageContainer: {
    marginVertical: 10,
    marginLeft: 10,
    backgroundColor: '#eeeeee',
    width: 100,
    height: 100,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
});
