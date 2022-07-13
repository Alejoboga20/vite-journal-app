import { useDispatch } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';

import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { checkingAuthentication, startGoogleSignIn } from '../../store/auth';

const initialFormValues = {
	email: '',
	password: '',
};

export const LoginPage = () => {
	const dispatch = useDispatch();
	const { email, password, onInputChange } = useForm(initialFormValues);

	const onSubmit = (event) => {
		event.preventDefault();

		dispatch(checkingAuthentication(email, password));
	};

	const onGoogleSignIn = () => {
		dispatch(startGoogleSignIn());
	};

	return (
		<AuthLayout title='Login'>
			<form onSubmit={onSubmit}>
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
							placeholder='password'
							value={password}
							onChange={onInputChange}
							fullWidth
						/>
					</Grid>

					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12} sm={6}>
							<Button variant='contained' fullWidth type='submit'>
								Login
							</Button>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button variant='contained' fullWidth startIcon={<Google />} onClick={onGoogleSignIn}>
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
