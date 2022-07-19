import { authSlice } from '../../../store/auth';
import { initialState } from '../../fixtures/authFixtures';

describe('authSlice Tests', () => {
	test('should return initial state', () => {
		expect(authSlice.name).toBe('auth');

		const state = authSlice.reducer(initialState, {});
		expect(state).toEqual(initialState);
	});
});
