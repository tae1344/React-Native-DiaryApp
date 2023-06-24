import * as firebase from './firebaseConfig';

const storage = firebase.storage;


export default class ImageAPI {
  static uploadImage = async (day, imageInfo) => {
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

    await storage.ref(storage, "images/" + day + "/" + imageInfo.name).put(blob)
      .then((snapshot) => console.log('Uploaded Image!!'))
      .catch((error) => console.log(error));

    blob.close();
  }

  static getImage = async (day, imageInfo, setImageURL) => {
    await storage.ref(storage, "images/" + day + "/" + imageInfo.imageName)
      .getDownloadURL().then((url) => {
        setImageURL(url);
      }).catch((error) => {
        console.log(error);
      });
  }

  static deleteImage = async (day, imageInfo) => {
    await storage.ref(storage, 'images/' + day + '/' + imageInfo.imageName)
      .delete().then(() => {
        console.log('Image File Delete!');
      }).catch((error) => {
        console.log(error);
      });
  }
}
