import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

//Development
/* const firebaseConfig = {
	apiKey: 'AIzaSyDXVqhGgojjbfiy3_pdabOBt8fPvhS8wIU',
	authDomain: 'react-tutorials-11879.firebaseapp.com',
	projectId: 'react-tutorials-11879',
	storageBucket: 'react-tutorials-11879.appspot.com',
	messagingSenderId: '48038583513',
	appId: '1:48038583513:web:642198a748485180a772c8',
}; */

//Testing
const firebaseConfig = {
	apiKey: 'AIzaSyAdb07ZA7sQVJYe6q544bzuetnUMV-wFxg',
	authDomain: 'react-tutorial-tests.firebaseapp.com',
	projectId: 'react-tutorial-tests',
	storageBucket: 'react-tutorial-tests.appspot.com',
	messagingSenderId: '817496311383',
	appId: '1:817496311383:web:1e461ba0870a028e600512',
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
