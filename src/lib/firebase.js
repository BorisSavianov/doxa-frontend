import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCHFWxocWOTDzu2tEZ5vs3wpFccksAp4dY",

  authDomain: "hackaton-1aaa0.firebaseapp.com",

  projectId: "hackaton-1aaa0",

  storageBucket: "hackaton-1aaa0.firebasestorage.app",

  messagingSenderId: "747628591511",

  appId: "1:747628591511:web:e814b352eca1eeae692cd2",

  measurementId: "G-DQ3121WHBX",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export { signInWithCustomToken };
