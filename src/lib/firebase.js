import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

// 🔧 Replace with your Firebase config
const firebaseConfig = {
  apiKey:            "AIzaSyCka_fk1lpMosEGYcMxQ44yr1m1FgWVrfQ",
  authDomain:        "football-scouting-world.firebaseapp.com",
  projectId:         "football-scouting-world",
  storageBucket:     "football-scouting-world.firebasestorage.app",
  messagingSenderId: "669078310274",
  appId:             "1:669078310274:web:f0eb9ec9d2a5a3d824d39b"
}

const app = initializeApp(firebaseConfig)
export const db  = getFirestore(app)
export const auth = getAuth(app)
