import { initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

export type firestoreUser = {
  completedLessons: string[];
};

export const getUserCompletedLessons = async (
  userId: string,
): Promise<firestoreUser> => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    console.log("Document data:", data);
    return {
      completedLessons: data.completedLessons || [],
    };
  } else {
    console.log("No such document!, thus making doc");
    const emptyCompletedLessons: string[] = [];
    await setDoc(docRef, { completedLessons: emptyCompletedLessons });
    return {
      completedLessons: emptyCompletedLessons,
    };
  }
};

export const addCompletedLessonToUser = async (
  completedLessonId: string,
  myAuth: Auth,
): Promise<void> => {
  // Return if no user
  console.log("Adding completed lesson to user");
  const user = myAuth.currentUser;
  if (!user) {
    return;
  }

  console.log("User is logged in");
  const userId = user.uid;
  const cityRef = doc(db, "users", userId);
  const docSnap = await getDoc(cityRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    const data = docSnap.data();
    const completedLessons = data.completedLessons || [];
    if (completedLessons.includes(completedLessonId)) {
      return;
    }
    completedLessons.push(completedLessonId);
    await setDoc(cityRef, { completedLessons }, { merge: true });
  }
};
