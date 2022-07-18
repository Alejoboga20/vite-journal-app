import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authSlice } from './auth';
import { journalSlice } from './journal';

const rootReducer = combineReducers({
	auth: authSlice.reducer,
	journal: journalSlice.reducer,
});

export const store = configureStore({
	reducer: rootReducer,
});
