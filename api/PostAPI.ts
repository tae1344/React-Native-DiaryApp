import { ref, set, onValue, update, remove } from 'firebase/database';
import * as firebase from './firebaseConfig';
import Post from '@/entity/post/Post';

const db = firebase.database;

export default class PostAPI {
  static createPost = async (request: Post) => {
    await set(ref(db, 'posts/' + request.date), {
      date: request.date,
      content: request.content,
      imageName: request.imageName,
      imageURI: request.imageURL,
    }).catch((error) => {
      if (error) {
        console.log(error);
      } else {
        console.log('Data saved successfully!');
      }
    });
  };

  static getPosts = async (setPosts) => {
    onValue(ref(db, 'posts'), (snapshot) => {
      setPosts(snapshot.val());
    });
  };

  static getOnePost = async (selectedDay, setReadPostData) => {
    onValue(ref(db, 'posts/' + selectedDay), (snapshot) => {
      setReadPostData(snapshot.val());
    });
  };

  static deletePost = async (day) => {
    await remove(ref(db, 'posts/' + day)).then(() => console.log('delete!!!'));
  };

  // public updatePost = async (post) => {
  //   const updates = {};
  //   updates['posts/postID'] = post;
  //   await update(ref(db), updates);
  // }
}
