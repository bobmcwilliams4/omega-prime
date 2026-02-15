import { initializeApp, getApps, FirebaseApp } from 'firebase/app'
import { getStorage, FirebaseStorage } from 'firebase/storage'
import { getFirestore, Firestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: 'echo-prime-ai.firebaseapp.com',
  projectId: 'echo-prime-ai',
  storageBucket: 'echo-prime-ai.appspot.com',
  messagingSenderId: '249995513427',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

let app: FirebaseApp
let storage: FirebaseStorage
let db: Firestore

if (typeof window !== 'undefined' && !getApps().length) {
  app = initializeApp(firebaseConfig)
  storage = getStorage(app)
  db = getFirestore(app)
} else if (getApps().length > 0) {
  app = getApps()[0]
  storage = getStorage(app)
  db = getFirestore(app)
}

export { app, storage, db }
export default firebaseConfig
