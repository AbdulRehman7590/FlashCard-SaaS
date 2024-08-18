import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAUaj7HykBZght8_rHo2Vz-HFi269IUHhk",
  authDomain: "flashcard-saas-9e.firebaseapp.com",
  projectId: "flashcard-saas-9e",
  storageBucket: "flashcard-saas-9e.appspot.com",
  messagingSenderId: "769100424838",
  appId: "1:769100424838:web:cea3ee58234762b447d307",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export default db;
