import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache } from 'firebase/firestore';

const config = {
  firebase: {
    apiKey: 'AIzaSyD8433gUdpO3VdzVHhw8eKLH3mtT_8qfdI',
    authDomain: 'next-mini-jira.firebaseapp.com',
    projectId: 'next-mini-jira',
    storageBucket: 'next-mini-jira.firebasestorage.app',
    messagingSenderId: '514927518642',
    appId: '1:514927518642:web:092eb3c30405d85a94faab',
  },
};

const app = initializeApp(config.firebase);
const auth = getAuth(app);
const db = initializeFirestore(app, {
  localCache: persistentLocalCache(),
});

export { app, auth, db };
export default config;
