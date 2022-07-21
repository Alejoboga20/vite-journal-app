import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { LoginPage } from '../../../auth/pages/LoginPage';
import { authSlice } from '../../../store/auth';

const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
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
});
