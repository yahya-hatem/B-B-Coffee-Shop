import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDH0KnVgcoizHpunxvIramM1600PrPH344M",
  authDomain: "bb-coffee-shop.firebaseapp.com",
  projectId: "bb-coffee-shop",
  storageBucket: "bb-coffee-shop.firebasestorage.app",
  messagingSenderId: "90847495410",
  appId: "1:90847495410:web:5b50c1e25b46a20641a9ab",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);