import firebase from './firebaseConfig';

// ------------- Firebase DataBase API --------------------------------------
// Create Post
export const createPost = async (post, date, imageInfo) => {
  await firebase.database().ref('posts/' + date).set({
    date: date,
    content: post,
    imageName: imageInfo.name,
    imageURI: imageInfo.uri
  }, (error) => {
    if (error) { console.log(error) }
    else { console.log('Data saved successfully!') }
  });
}
// Get Posts
export const getPosts = async (setPosts) => {
  await firebase.database().ref('posts').on('value', (snapshot) => {
    setPosts(snapshot.val());
  });
}
// Get One Post
export const getOnePost = async (selectedDay, setReadPostData) => {
  await firebase.database().ref('posts/' + selectedDay).once('value').then((snapshot) => {
    // console.log('json ::', snapshot.val())
    // return snapshot.val().content;
    setReadPostData(snapshot.val());
  });
}

// export const updatePost = async () => {
//   await firebase.database().ref('posts/postID').update()
//     .then((snapshot) => console.log('update ::', snapshot.val()));
// }

// Delete Post
export const deletePost = async (day) => {
  await firebase.database().ref('posts/').child(day).remove()
    .then(() => console.log('delete!!!'));
}
// ----------------------- END -------------------------------------------------

// --------------------------- Firebase Storage API ----------------------------------------

// Upload Image file
export const uploadImage = async (day, imageInfo) => {
  // Why are we using XMLHttpRequest? See:
  // https://github.com/expo/expo/issues/2402#issuecomment-443726662
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', imageInfo.uri, true);
    xhr.send(null);
  });

  const storageRef = firebase.storage().ref();
  await storageRef.child("images/" + day + "/" + imageInfo.name).put(blob)
    .then((snapshot) => console.log('Uploaded Image!!'))
    .catch((error) => console.log(error));

  blob.close();
}

// Get Uploaded Image file
export const getImage = async (day, imageInfo, setImageURL) => {
  const storageRef = firebase.storage().ref();
  const starsRef = storageRef.child("images/" + day + "/" + imageInfo.imageName);

  await starsRef.getDownloadURL().then((url) => {
    //console.log('url :::', url);
    setImageURL(url);
  }).catch((error) => {
    console.log(error);
  });
}

// Delete Image file
export const deleteImage = async (day, imageInfo) => {
  const storageRef = firebase.storage().ref();
  const deserRef = storageRef.child('images/' + day + '/' + imageInfo.imageName);

  await deserRef.delete().then(() => {
    console.log('Image File Delete!');
  }).catch((error) => {
    console.log(error);
  });
}