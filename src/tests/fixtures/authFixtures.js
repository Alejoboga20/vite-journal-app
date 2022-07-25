export const initialState = {
	status: 'checking',
	uid: null,
	email: null,
	displayName: null,
	photoURL: null,
	errorMessage: null,
};

export const authenticatedState = {
	status: 'authenticated',
	uid: 'ABC123',
	email: 'test@email.com',
	displayName: 'Test User',
	photoURL: 'https://demo.jpg',
	errorMessage: null,
};

export const notAuthenticatedState = {
	status: 'not-authenticated',
	uid: null,
	email: null,
	displayName: null,
	photoURL: null,
	errorMessage: undefined,
};

export const demoUser = {
	uid: 'ABC123',
	email: 'test@email.com',
	displayName: 'Test User',
	photoURL: 'https://demo.jpg',
};
