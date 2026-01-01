import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const config = {
  firebase: {
    apiKey: "AIzaSyDkirdT4ehu4UruJwQ-SXlMmm6tXoBe4zs",
    authDomain: "next-mini-jira.firebaseapp.com",
    projectId: "next-mini-jira",
    storageBucket: "next-mini-jira.firebasestorage.app",
    messagingSenderId: "514927518642",
    appId: "1:514927518642:web:9a814aed05e3a68c94faab",
  },
};

export default config;

export const app = initializeApp(config.firebase);
export const auth = getAuth(app);
export const db = getFirestore(app);
