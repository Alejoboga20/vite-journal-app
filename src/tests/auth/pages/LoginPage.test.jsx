import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { LoginPage } from '../../../auth/pages/LoginPage';
import { authSlice } from '../../../store/auth';
import { startGoogleSignIn } from '../../../store/auth/thunks';
import { notAuthenticatedState } from '../../fixtures/authFixtures';

const mockStartGoogleSignIn = jest.fn();

jest.mock('../../../store/auth/thunks', () => ({
	startGoogleSignIn: () => mockStartGoogleSignIn,
}));

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
	},
	preloadedState: {
		auth: notAuthenticatedState,
	},
});

describe('LoginPage Tests', () => {
	test('should render', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginPage />
				</MemoryRouter>
			</Provider>
		);

		expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
	});

	test('should call startGoogleSignIn', () => {
		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginPage />
				</MemoryRouter>
			</Provider>
		);

		const googleBtn = screen.getByLabelText('google-btn');
		fireEvent.click(googleBtn);

		expect(mockStartGoogleSignIn).toHaveBeenCalled();
	});
});
