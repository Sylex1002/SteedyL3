import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDqSiyyTBdauCdpu0cnRVdVn8BecRBt_u8",
  authDomain: "steedy-auth.firebaseapp.com",
  projectId: "steedy-auth",
  storageBucket: "steedy-auth.appspot.com",
  messagingSenderId: "111893660222",
  appId: "1:111893660222:web:75115ee43568752af1476f",
  measurementId: "G-RHPCEQPPQC",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export { auth };
