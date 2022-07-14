import { registerWithEmailPassword, singInWithGoogle } from '../../firebase/providers';
import { checkingCredentials, login, logout } from './authSlice';

export const checkingAuthentication = (email, password) => {
	return async (dispatch) => {
		dispatch(checkingCredentials());
	};
};

export const startGoogleSignIn = () => {
	return async (dispatch) => {
		dispatch(checkingCredentials());

		const result = await singInWithGoogle();

		if (!result.ok) return dispatch(logout(result));

		dispatch(login(result));
	};
};

export const startCreatingUserWithEmailPassword = (email, password, displayName) => {
	console.log({ email, password, displayName });
	return async (dispatch) => {
		dispatch(checkingCredentials());

		const result = await registerWithEmailPassword(email, password, displayName);
		console.log(result);
	};
};
