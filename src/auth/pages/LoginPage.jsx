import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';
import { useMemo } from 'react';

const initialFormValues = {
	email: '',
	password: '',
};

export const LoginPage = () => {
	const dispatch = useDispatch();
	const { status, errorMessage } = useSelector((state) => state.auth);

	const { email, password, onInputChange } = useForm(initialFormValues);

	const isAuthenticating = useMemo(() => status === 'checking', [status]);

	const onSubmit = (event) => {
		event.preventDefault();

		dispatch(startLoginWithEmailPassword(email, password));
	};

	const onGoogleSignIn = () => {
		dispatch(startGoogleSignIn());
	};

	return (
		<AuthLayout title='Login'>
			<form
				aria-label='signin-form'
				onSubmit={onSubmit}
				className='animate__animated animate__fadeIn animate__faster'
			>
				<Grid container>
					<Grid item sx={{ mt: 2 }} xs={12}>
						<TextField
							label='email'
							type='email'
							name='email'
							placeholder='email@email.com'
							value={email}
							onChange={onInputChange}
							fullWidth
						/>
					</Grid>
					<Grid item sx={{ mt: 2 }} xs={12}>
						<TextField
							label='password'
							type='password'
							name='password'
							inputProps={{
								'data-testid': 'password',
							}}
							placeholder='password'
							value={password}
							onChange={onInputChange}
							fullWidth
						/>
					</Grid>

					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12} sm={6} display={!!errorMessage ? '' : 'none'}>
							<Alert severity='error'>{errorMessage}</Alert>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button variant='contained' fullWidth type='submit' disabled={isAuthenticating}>
								Login
							</Button>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button
								aria-label='google-btn'
								variant='contained'
								fullWidth
								startIcon={<Google />}
								onClick={onGoogleSignIn}
								disabled={isAuthenticating}
							>
								<Typography sx={{ ml: 1 }}>Google</Typography>
							</Button>
						</Grid>
					</Grid>

					<Grid container direction='row' justifyContent='end'>
						<Link color='inherit' to='/auth/register' component={RouterLink}>
							Create an Account
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
