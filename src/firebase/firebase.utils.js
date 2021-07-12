import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDGxBbldsTqgmS4ZsMNdUgFFUds7ATRtc0",
  authDomain: "crwn-db-a9425.firebaseapp.com",
  projectId: "crwn-db-a9425",
  storageBucket: "crwn-db-a9425.appspot.com",
  messagingSenderId: "235467488132",
  appId: "1:235467488132:web:1106ae24da431d17b63bd1",
  measurementId: "G-G1GKN7V4WT",
};

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) {
    return;
  }
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (ex) {
      console.log("Error creating user", ex.message);
    }
  }
  return userRef;
};

//importing google authentication utility.
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const singInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
