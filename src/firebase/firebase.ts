import { FirebaseError, initializeApp } from "firebase/app";
import {
  AdditionalUserInfo,
  createUserWithEmailAndPassword,
  getAdditionalUserInfo,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import {
  collection,
  doc,
  DocumentData,
  getDocs,
  getFirestore,
  query,
  QueryDocumentSnapshot,
  setDoc,
  where,
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
    const additionalUserInfo: AdditionalUserInfo | null =
      getAdditionalUserInfo(res);
    if (additionalUserInfo?.isNewUser)
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
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      tasks: [],
      email,
      name,
    });
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      handleErrorMessage(error.message);
    }
  }
};

export const fetchUserData = async (
  user: User,
  setUserFromDB: React.Dispatch<
    React.SetStateAction<QueryDocumentSnapshot<DocumentData> | undefined>
  >,
  setAllTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  setName: React.Dispatch<React.SetStateAction<string>>
) => {
  const q = query(collection(db, "users"), where("uid", "==", user?.uid));
  const doc = await getDocs(q);
  const data = doc.docs[0].data();
  setUserFromDB(doc.docs[0]);
  setAllTasks(data.tasks);
  setName(data.name || (user?.displayName ?? user?.email));
};

export const toggleComplete = async (
  user: QueryDocumentSnapshot<DocumentData> | undefined,
  tasks: Task[],
  task: Task
) => {
  await setDoc(doc(db, "users", user!.id), {
    ...user!.data(),
    tasks: tasks.map((taskFromDB: Task) => {
      if (taskFromDB.id === task.id) {
        return { ...taskFromDB, complete: !task.complete };
      }
      return { ...taskFromDB };
    }),
  });
};

export const deleteTask = async (
  user: QueryDocumentSnapshot<DocumentData> | undefined,
  tasks: Task[],
  task: Task
) => {
  await setDoc(doc(db, "users", user!.id), {
    ...user!.data(),
    tasks: tasks.filter((taskFromDB: Task) => {
      if (taskFromDB.id !== task.id) {
        return { ...taskFromDB };
      }
    }),
  });
};

export const logout = () => {
  signOut(auth);
};
