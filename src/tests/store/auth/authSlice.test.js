import { authSlice, checkingCredentials, login, logout } from '../../../store/auth';
import {
	authenticatedState,
	demoUser,
	initialState,
	notAuthenticatedState,
} from '../../fixtures/authFixtures';

describe('authSlice Tests', () => {
	test('should return initial state', () => {
		expect(authSlice.name).toBe('auth');

		const state = authSlice.reducer(initialState, {});
		expect(state).toEqual(initialState);
	});

	test('should login user', () => {
		const state = authSlice.reducer(initialState, login(demoUser));
		expect(state).toEqual(authenticatedState);
	});

	test('should logout with no args', () => {
		const state = authSlice.reducer(authenticatedState, logout());
		expect(state).toEqual(notAuthenticatedState);
	});

	test('should logout with error message', () => {
		const state = authSlice.reducer(authenticatedState, logout({ message: 'Logout error' }));
		expect(state).toEqual({ ...notAuthenticatedState, errorMessage: 'Logout error' });
	});

	test('should change status to checking', () => {
		const state = authSlice.reducer(authenticatedState, checkingCredentials());
		expect(state.status).toBe('checking');
	});
});
