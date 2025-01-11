// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyDUpsyjrhdeVHFYRV_4CmALcKbKlX4fhx4",
    authDomain: "daeem-delivery-android-ios.firebaseapp.com",
    databaseURL: "https://daeem-delivery-android-ios.firebaseio.com",
    projectId: "daeem-delivery-android-ios",
    storageBucket: "daeem-delivery-android-ios.appspot.com",
    messagingSenderId: "97313094386",
    appId: "1:97313094386:web:e5c99f508db5029dbeae6b",
    measurementId: "G-KCJXM6TTK4"
  };

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
//   }
  
//   export const db = firebase.firestore();

export { database, ref, onValue };
