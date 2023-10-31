import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZzewTuw2-Ie1iSysMC4_619zHxCyLsTE",
  authDomain: "saas-translator-app-mo7.firebaseapp.com",
  projectId: "saas-translator-app-mo7",
  storageBucket: "saas-translator-app-mo7.appspot.com",
  messagingSenderId: "133226082588",
  appId: "1:133226082588:web:a28057dd79cc8e4fdb4ad9",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { auth, db, functions };
