import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
	apiKey: 'AIzaSyDXVqhGgojjbfiy3_pdabOBt8fPvhS8wIU',
	authDomain: 'react-tutorials-11879.firebaseapp.com',
	projectId: 'react-tutorials-11879',
	storageBucket: 'react-tutorials-11879.appspot.com',
	messagingSenderId: '48038583513',
	appId: '1:48038583513:web:642198a748485180a772c8',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
