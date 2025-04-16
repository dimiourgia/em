// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD2rMt9kmAuisrZz0PO3hvIeY2Eld_tk38",
    authDomain: "empressa-fashion.firebaseapp.com",
    projectId: "empressa-fashion",
    storageBucket: "empressa-fashion.firebasestorage.app",
    messagingSenderId: "1090527073065",
    appId: "1:1090527073065:web:2fb339dd4eec51934c9d38",
    measurementId: "G-S38GT8HQXG"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
