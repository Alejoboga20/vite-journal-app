import {
	GoogleAuthProvider,
	signInWithPopup,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { FirebaseAuth } from './config';

const googleProvider = new GoogleAuthProvider();

export const singInWithGoogle = async () => {
	try {
		const result = await signInWithPopup(FirebaseAuth, googleProvider);
		const { displayName, email, uid, photoURL } = result.user;

		return {
			ok: true,
			displayName,
			email,
			uid,
			photoURL,
		};
	} catch (error) {
		const { code, message } = error;

		return {
			ok: false,
			code,
			message,
		};
	}
};

export const registerWithEmailPassword = async (email, password, displayName) => {
	try {
		const response = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
		const { uid, photoURL } = response.user;

		await updateProfile(FirebaseAuth.currentUser, { displayName });

		return {
			ok: true,
			uid,
			photoURL,
			displayName,
		};
	} catch (error) {
		const { code, message } = error;

		return {
			ok: false,
			code,
			message,
		};
	}
};

export const loginInWithEmailAndPassword = async (email, password) => {
	try {
		const response = await signInWithEmailAndPassword(FirebaseAuth, email, password);
		const { uid, photoURL, displayName } = response.user;

		return {
			ok: true,
			uid,
			photoURL,
			displayName,
		};
	} catch (error) {
		const { code, message } = error;

		return {
			ok: false,
			code,
			message,
		};
	}
};
