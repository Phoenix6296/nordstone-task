import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDjEBkuxnc5pVkC9MrwPiYHXpdszAQVV_Q",
    authDomain: "nordstone-project-43814.firebaseapp.com",
    projectId: "nordstone-project-43814",
    storageBucket: "nordstone-project-43814.appspot.com",
    messagingSenderId: "904881079681",
    appId: "1:904881079681:web:36f154ee445d39ea339480",
    measurementId: "G-KGX4NGLY7F"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();

export { app, auth };