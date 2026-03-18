import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyAjQlVEIWVmSr2cG0upUxlnPExqrvud2SI",
  authDomain: "login-auth-grainco.firebaseapp.com",
  projectId: "login-auth-grainco",
  storageBucket: "login-auth-grainco.firebasestorage.app",
  messagingSenderId: "433982328559",
  appId: "1:433982328559:web:38225b724ba0784c4f151a"
};

const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
