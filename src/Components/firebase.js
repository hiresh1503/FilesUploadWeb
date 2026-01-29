import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAaqjBZvS38-33SVuM7DwnF5qO8LJmqOCQ",
  authDomain: "file-upload-e833d.firebaseapp.com",
  projectId: "file-upload-e833d",
  storageBucket: "file-upload-e833d.appspot.com",
  messagingSenderId: "406329344150",
  appId: "1:406329344150:web:8f512a18d90031eb5082b7",
  measurementId: "G-2P0GCWQBKL"
};
  
   const app = initializeApp(firebaseConfig);
   export const storage = getStorage(app);
  
  