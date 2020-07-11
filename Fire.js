//import FirebaseKeys from "./config";
import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyB5WCTAlZnM3ARrejR6v8MFJIyA5U1ajfo",
  authDomain: "binge-5fe63.firebaseapp.com",
  databaseURL: "https://binge-5fe63.firebaseio.com",
  projectId: "binge-5fe63",
  storageBucket: "binge-5fe63.appspot.com",
  messagingSenderId: "385686415497",
  appId: "1:385686415497:web:bc4d90b75fa88ed3437e58",
  measurementId: "G-EKX0HX4HFH",
};

class Fire {
  constructor() {
    firebase.initializeApp(firebaseConfig);
  }

  addPost = async ({ text, localUri }) => {
    const remoteUri = await this.uploadPhotoAsync(localUri);

    return new Promise((res, rej) => {
      this.firestore
        .collection("posts")
        .add({
          text,
          uid: this.uid,
          timestamp: this.timestamp,
          image: remoteUri,
        })
        .then((ref) => {
          res(ref);
        })
        .catch((error) => {
          rej(error);
        });
    });
  };

  uploadPhotoAsync = async (uri) => {
    const path = `photos/${this.uid}/${Date.now()}.jpg`;

    return new Promise(async (res, rej) => {
      const response = await fetch(url);
      const file = await response.blob();

      let upload = firestore.storage().ref(path).put(file);

      upload.on(
        "state_changed",
        (snapshot) => {},
        (err) => {
          rej(err);
        },
        async () => {
          const url = await upload.snapshot.ref.getDownloadUrl();
          res(url);
        }
      );
    });
  };

  get Firebase() {
    return firebase.firestore();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }

  get timestamp() {
    return Date.now();
  }
}

Fire.shared = new Fire();
export default Fire;
