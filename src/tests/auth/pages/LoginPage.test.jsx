import { Provider, useDispatch } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import { LoginPage } from '../../../auth/pages/LoginPage';
import { authSlice } from '../../../store/auth';
import { notAuthenticatedState } from '../../fixtures/authFixtures';

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailPassword = jest.fn();

jest.mock('../../../store/auth/thunks', () => ({
	startGoogleSignIn: () => mockStartGoogleSignIn,
	startLoginWithEmailPassword: (email, password) => {
		return () => mockStartLoginWithEmailPassword(email, password);
	},
}));

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useDispatch: () => (fn) => fn(),
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
	beforeEach(() => jest.clearAllMocks());

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

	test('should call startLoginWithEmailAndPassword', () => {
		const email = 'test@email.com';
		const password = 'TestingTest1234!';

		render(
			<Provider store={store}>
				<MemoryRouter>
					<LoginPage />
				</MemoryRouter>
			</Provider>
		);

		const emailField = screen.getByRole('textbox', { name: 'email' });
		fireEvent.change(emailField, { target: { name: 'email', value: email } });

		const passwordField = screen.getByTestId('password');
		fireEvent.change(passwordField, { target: { name: 'password', value: password } });

		const form = screen.getByLabelText('signin-form');
		fireEvent.submit(form);

		expect(mockStartLoginWithEmailPassword).toHaveBeenCalledWith(email, password);
	});
});
