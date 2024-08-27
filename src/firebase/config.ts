// src/firebase/config.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBAXI4fVtYNCDJf6tSXwIpAKb61jm2WWHM",
  authDomain: "gyms-d9680.firebaseapp.com",
  projectId: "gyms-d9680",
  storageBucket: "gyms-d9680.appspot.com",
  messagingSenderId: "1046373155859",
  appId: "1:1046373155859:web:47aa6799d65033a447ebe6",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
