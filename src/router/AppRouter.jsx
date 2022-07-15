import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { AuthRoutes } from '../auth';
import { JournalRoutes } from '../journal';
import { CheckingAuth } from '../ui';

export const AppRouter = () => {
	const { status } = useSelector((state) => state.auth);

	if (status === 'checking') return <CheckingAuth />;

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
