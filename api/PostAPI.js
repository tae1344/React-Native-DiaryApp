import { ref, set, onValue, update, remove } from "firebase/database";
import * as firebase from "./firebaseConfig";

const db = firebase.database;

export default class PostAPI {
  static createPost = async (post, date, imageInfo) => {
    await set(ref(db, "posts/" + date), {
      date: date,
      content: post,
      imageName: imageInfo.name,
      imageURI: imageInfo.uri,
    }).catch((error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Data saved successfully!");
      }
    });
  };

  static getPosts = async (setPosts) => {
    onValue(ref(db, "posts"), (snapshot) => {
      setPosts(snapshot.val());
    });
  };

  static getOnePost = async (selectedDay, setReadPostData) => {
    onValue(ref(db, "posts/" + selectedDay), (snapshot) => {
      setReadPostData(snapshot.val());
    });
  };

  static deletePost = async (day) => {
    await remove(ref(db, "posts/" + day)).then(() => console.log("delete!!!"));
  };

  // public updatePost = async (post) => {
  //   const updates = {};
  //   updates['posts/postID'] = post;
  //   await update(ref(db), updates);
  // }
}
