import React, { useEffect, useRef } from 'react';
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Header from '@components/ui/Header';
import { useNavigation } from '@react-navigation/native';
import Post from '@/entity/post/Post';
import Typography from '@components/typography/Typography';
import PostAPI from '@api/PostAPI';
import { proxy, useSnapshot } from 'valtio';

type PropsType = {};

type StateType = {
  posts: { [date: string]: Post };
};

export default function PostListView(props: PropsType) {
  const navigation = useNavigation();

  const state = useRef(
    proxy<StateType>({
      posts: null,
    })
  ).current;

  const snap = useSnapshot(state);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = () => {
    PostAPI.getPosts((response) => (state.posts = response));
  };

  const goToRead = (post: Post) => {
    navigation.navigate('PostRead', {
      date: post.date,
    });
  };

  return (
    <View style={styles.container}>
      <Header title={'나의 기록'} />
      {state.posts && Object.keys(state.posts).length > 0 ? (
        <FlatList
          data={Object.values(state.posts)}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => goToRead(item)}>
              <Typography size={16}>{item.date}</Typography>
              <Typography size={16} numberOfLines={1}>
                {item.content}
              </Typography>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.date}
        />
      ) : (
        <View style={styles.empty}>
          <Image style={{ marginBottom: 16 }} source={require('@assets/images/searchIcon/ic_notfound.png')} />
          <Typography size={18}>작성된 기록이 없어요</Typography>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f6f9',
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
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
  empty: {
    position: 'absolute',
    top: '40%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
