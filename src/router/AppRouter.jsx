import { Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth';
import { JournalRoutes } from '../journal';

export const AppRouter = () => {
	return (
		<Routes>
			{/* Signin && Signup */}
			<Route path='/auth/*' element={<AuthRoutes />} />

			{/* Journal */}
			<Route path='/*' element={<JournalRoutes />} />
			<Route />
		</Routes>
	);
};
