import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBl92t5KrCFVxe6ou9agcXUhXOgffGRn1Y",
  authDomain: "adi-blog-images.firebaseapp.com",
  projectId: "adi-blog-images",
  storageBucket: "adi-blog-images.appspot.com",
  messagingSenderId: "687905187684",
  appId: "1:687905187684:web:7355580cece0be5891bc71",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app, "gs://adi-blog-images.appspot.com");
