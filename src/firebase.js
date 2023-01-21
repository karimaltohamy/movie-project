import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth" 

const firebaseConfig = {
    apiKey: "AIzaSyCdf_1bkrkCX2OZm8S7ORJeC3XNgqGR6sk",
    authDomain: "movies-project-dc1a8.firebaseapp.com",
    projectId: "movies-project-dc1a8",
    storageBucket: "movies-project-dc1a8.appspot.com",
    messagingSenderId: "523073425645",
    appId: "1:523073425645:web:96ef27c91e58ea82b4bce4"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export default auth;
