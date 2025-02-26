// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {initializeAuth,getReactNativePersistence} from 'firebase/auth'
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtlJDGl0oFC7ZWouUA-tTYjneN_h_oshY",
  authDomain: "courseai-ef452.firebaseapp.com",
  projectId: "courseai-ef452",
  storageBucket: "courseai-ef452.firebasestorage.app",
  messagingSenderId: "72306262439",
  appId: "1:72306262439:web:d3d2ceae9f1c0787897682",
  measurementId: "G-CBSCGHK53P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =initializeAuth(app,{
    persistence:getReactNativePersistence(ReactNativeAsyncStorage)
})
export const db=getFirestore(app) 
const analytics = getAnalytics(app);