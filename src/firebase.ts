import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDQIUR843216dOZ2eo3wfrVQQ3mivcRkOc",
    authDomain: "vitter-83b66.firebaseapp.com",
    projectId: "vitter-83b66",
    storageBucket: "vitter-83b66.appspot.com",
    messagingSenderId: "619396025282",
    appId: "1:619396025282:web:da4b209a42b5ad7909e45b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);