
//Change this later on

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAo2gr7KKRfZcDwl_AKR2WkLe9DAK4-510",
    authDomain: "upscale-printing-solutions.firebaseapp.com",
    projectId: "upscale-printing-solutions",
    storageBucket: "upscale-printing-solutions.appspot.com",
    messagingSenderId: "607895251568",
    appId: "1:607895251568:web:c9d7007078225de698a2b5",
    // measurementId: "G-F87076YXG0",
};

const app = initializeApp(firebaseConfig, "upscale printing solutions");
export const storage = getStorage(app);
export const db = getFirestore(app);
export const auth = getAuth(app);

