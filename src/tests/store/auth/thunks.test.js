import {
	loginInWithEmailAndPassword,
	logoutFirebase,
	singInWithGoogle,
} from '../../../firebase/providers';
import { checkingCredentials, login, logout } from '../../../store/auth/authSlice';
import {
	checkingAuthentication,
	startGoogleSignIn,
	startLoginWithEmailPassword,
	startLogout,
} from '../../../store/auth/thunks';
import { clearNotesLogout } from '../../../store/journal';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../firebase/providers.js');

const dispatch = jest.fn();

describe('Auth Thunks Tests', () => {
	beforeEach(() => jest.clearAllMocks());

	test('should call checkingCredentials', async () => {
		await checkingAuthentication()(dispatch);
		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
	});

	test('should startGoogleSignIn should call checkingCredentials and login', async () => {
		const loginData = { ok: true, ...demoUser };
		await singInWithGoogle.mockResolvedValue(loginData);

		await startGoogleSignIn()(dispatch);
		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(login(loginData));
	});

	test('should startGoogleSignIn should call checkingCredentials and logout with error', async () => {
		const logoutData = { ok: false, errorMessage: 'Test Error' };
		await singInWithGoogle.mockResolvedValue(logoutData);

		await startGoogleSignIn()(dispatch);
		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(logout(logoutData));
	});

	test('should startLoginWithEmailAndPassword should call checkingCredentials and login', async () => {
		const { email, password = 'TestingTest1234!' } = demoUser;
		const loginData = { ok: true, ...demoUser };

		await loginInWithEmailAndPassword.mockResolvedValue(loginData);
		await startLoginWithEmailPassword(email, password)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(login(demoUser));
	});

	test('should startLoginWithEmailAndPassword should call checkingCredentials and logout with error', async () => {
		const { email, password = 'WrongPassword' } = demoUser;
		const logoutData = { ok: false, message: 'Wrong Password' };

		await loginInWithEmailAndPassword.mockResolvedValue(logoutData);
		await startLoginWithEmailPassword(email, password)(dispatch);

		expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
		expect(dispatch).toHaveBeenCalledWith(logout({ message: 'Wrong Password' }));
	});

	test('should call logoutFireBase, clearNotes and logout', async () => {
		await startLogout()(dispatch);

		expect(logoutFirebase).toHaveBeenCalled();
		expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
		expect(dispatch).toHaveBeenCalledWith(logout({}));
	});
});
