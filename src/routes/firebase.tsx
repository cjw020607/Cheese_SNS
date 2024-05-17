import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCbFDaUW0n4QQ4TcQyPqT7sv5jPADY1qPo",
  authDomain: "cheese-sns-68ef9.firebaseapp.com",
  projectId: "cheese-sns-68ef9",
  storageBucket: "cheese-sns-68ef9.appspot.com",
  messagingSenderId: "774286385266",
  appId: "1:774286385266:web:cf68bc118f44d6c606a2eb",
  measurementId: "G-LN61WB4MPG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app); 

export const db=getFirestore(app);

export const storage=getStorage(app);