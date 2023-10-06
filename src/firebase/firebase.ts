import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { EmailAuthProvider, GoogleAuthProvider, connectAuthEmulator, getAuth } from 'firebase/auth';
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

//auth
export const auth = getAuth(app);
export const googleAuthProvider = new GoogleAuthProvider();
export const emailAuthProvider = new EmailAuthProvider();
export const firebaseAuthSignedInEvent = 'firebase-auth-signed-in';
export const firebaseAuthSignedOutEvent = 'firebase-auth-signed-out';

auth.onAuthStateChanged((user) => {
  // ログイン状態が変わったらイベントを発火
  console.log("signed in");
  document.dispatchEvent(new CustomEvent(firebaseAuthSignedInEvent));
});


//functions
export const functions = getFunctions(app, "asia-northeast1");
if(import.meta.env.VITE_FIREBASE_EMULATORS == "true"){
  console.log("connect to firebase functions emulator");
  connectFunctionsEmulator(functions, "127.0.0.1", 5001);
}