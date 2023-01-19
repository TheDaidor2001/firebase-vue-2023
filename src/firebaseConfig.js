import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'

const firebaseConfig = {
//TODO: Pasar todo a variables de entorno
  apiKey: "AIzaSyDH49TkIKKPNI_7iTDSZQ7ALf7qziVfG8E",
  authDomain: "vue3-firebase9-2023.firebaseapp.com",
  projectId: "vue3-firebase9-2023",
  storageBucket: "vue3-firebase9-2023.appspot.com",
  messagingSenderId: "694133991776",
  appId: "1:694133991776:web:5d02483e7f6a7d4d195605"
};


initializeApp(firebaseConfig);

const auth = getAuth()
const db = getFirestore()

export {auth, db}