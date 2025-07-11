// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";
// import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuoLHR8g-mslvn8GytH4aZiHIDxkS8Sio",
  authDomain: "ticket-hub-b6cc7.firebaseapp.com",
  projectId: "ticket-hub-b6cc7",
  storageBucket: "ticket-hub-b6cc7.firebasestorage.app",
  messagingSenderId: "39301436187",
  appId: "1:39301436187:web:210c1aaa3feda14ddab9be",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
// Analytics chỉ khởi tạo trong browser environment
//const analytics = typeof window !== "undefined" ? getAnalytics(app) : null;
const auth = getAuth(app);
// const db = getFirestore(app);
// const storage = getStorage(app);
// const functions = getFunctions(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.addScope("email");
googleProvider.addScope("profile");
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Export Firebase services
export { googleProvider };
export default auth;
