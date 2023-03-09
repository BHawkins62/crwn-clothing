import { initializeApp } from 'firebase/app';
import { 
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import {
   getFirestore,
   doc,
   getDoc,
   setDoc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAhv3fqvNnhaECsplGqqkkggzHq0LPnRz8",
  authDomain: "crown-clthg-db.firebaseapp.com",
  projectId: "crown-clthg-db",
  storageBucket: "crown-clthg-db.appspot.com",
  messagingSenderId: "77022443604",
  appId: "1:77022443604:web:91a500367d7239493f15c1"
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account",
}); 

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
   const userDocRef = doc(db, 'users', userAuth.uid);

   const userSnapshot = await getDoc(userDocRef);

   if(!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
         await setDoc(userDocRef, {
            displayName,
            email,
            createdAt
         });
      } catch (error) {
         console.log('error creating the user', error.message);
      }
   }

  return userDocRef; 
};