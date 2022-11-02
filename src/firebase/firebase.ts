import { FirebaseError, initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (
  handleErrorMessage: (message: string) => void
) => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      tasks: [],
      email: user.email,
    });
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      handleErrorMessage(error.message);
    }
  }
};

export const logInWithEmailAndPassword = async (
  email: string,
  password: string,
  handleErrorMessage: (message: string) => void
) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      handleErrorMessage(error.message);
    }
  }
};

export const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string,
  handleErrorMessage: (message: string) => void
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      tasks: [],
      name,
      email,
    });
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      handleErrorMessage(error.message);
    }
  }
};

export const logout = () => {
  signOut(auth);
};
