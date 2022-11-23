
//Change this later on

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
    apiKey: "AIzaSyC3gknBKtYUdObP8-Pgtgjbk3mH4snh0jk",
    authDomain: "practice-a80a2.firebaseapp.com",
    projectId: "practice-a80a2",
    storageBucket: "practice-a80a2.appspot.com",
    messagingSenderId: "241177419412",
    appId: "1:241177419412:web:c15ec4b70258dcf878de81",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);

