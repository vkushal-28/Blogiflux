// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWmbmyU4621QPxS4x1ZKI4H7mVwezyIXQ",
  authDomain: "mern-blog-71910.firebaseapp.com",
  projectId: "mern-blog-71910",
  storageBucket: "mern-blog-71910.appspot.com",
  messagingSenderId: "323738753441",
  appId: "1:323738753441:web:a3bf9eeee0635688f7d3e0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {
  let user = null;

  await signInWithPopup(auth, provider)
    .then((result) => {
      user = result.user;
    })
    .catch((err) => {
      console.log(err);
    });

  return user;
};
