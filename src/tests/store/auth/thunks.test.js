import { singInWithGoogle } from '../../../firebase/providers';
import { checkingCredentials, login, logout } from '../../../store/auth/authSlice';
import { checkingAuthentication, startGoogleSignIn } from '../../../store/auth/thunks';
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
});
