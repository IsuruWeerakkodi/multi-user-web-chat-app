// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbOE1m690CgBTu2btK0dMLnkrvoMm1z6Q",
  authDomain: "dep11-chat-app-c0120.firebaseapp.com",
  projectId: "dep11-chat-app-c0120",
  storageBucket: "dep11-chat-app-c0120.appspot.com",
  messagingSenderId: "184402503382",
  appId: "1:184402503382:web:df1498b4555b05d9c34b77"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
export {app, auth};