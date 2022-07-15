import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert, Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { useForm } from '../../hooks';
import { AuthLayout } from '../layout/AuthLayout';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';

const initialFormValues = {
	email: '',
	password: '',
	displayName: '',
};

const formValidations = {
	email: [(value) => value.includes('@'), 'Email should contiain @'],
	password: [(value) => value.length >= 6, 'Password should have at least 6 characters'],
	displayName: [(value) => value.length >= 1, 'Name is required'],
};

export const RegisterPage = () => {
	const [formSubmited, setFormSubmited] = useState(false);

	const dispatch = useDispatch();
	const { status, errorMessage } = useSelector((state) => state.auth);

	const isCheckingAuthenticating = useMemo(() => status === 'checking', [status]);

	const {
		email,
		password,
		displayName,
		emailValid,
		passwordValid,
		displayNameValid,
		isFormValid,
		formState,
		onInputChange,
	} = useForm(initialFormValues, formValidations);

	const onSubmit = (event) => {
		event.preventDefault();
		setFormSubmited(true);

		if (!isFormValid) return;

		dispatch(startCreatingUserWithEmailPassword(email, password, displayName));
	};

	return (
		<AuthLayout title='Register'>
			<form onSubmit={onSubmit}>
				<Grid container>
					<Grid item sx={{ mt: 2 }} xs={12}>
						<TextField
							label='Name'
							name='displayName'
							type='text'
							placeholder='fullname'
							onChange={onInputChange}
							value={displayName}
							error={!!displayNameValid && formSubmited}
							helperText={formSubmited && displayNameValid}
							fullWidth
						/>
					</Grid>
					<Grid item sx={{ mt: 2 }} xs={12}>
						<TextField
							label='Email'
							name='email'
							type='email'
							placeholder='email@email.com'
							onChange={onInputChange}
							value={email}
							error={!!emailValid && formSubmited}
							helperText={formSubmited && emailValid}
							fullWidth
						/>
					</Grid>
					<Grid item sx={{ mt: 2 }} xs={12}>
						<TextField
							label='Password'
							name='password'
							type='password'
							placeholder='password'
							onChange={onInputChange}
							value={password}
							error={!!passwordValid && formSubmited}
							helperText={formSubmited && passwordValid}
							fullWidth
						/>
					</Grid>

					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12} display={!!errorMessage ? '' : 'none'}>
							<Alert severity='error'>{errorMessage}</Alert>
						</Grid>
						<Grid item xs={12}>
							<Button
								variant='contained'
								fullWidth
								type='submit'
								disabled={isCheckingAuthenticating}
							>
								Create Account
							</Button>
						</Grid>
					</Grid>

					<Grid container direction='row' justifyContent='end'>
						<Typography sx={{ mr: 1 }}>Already have an account?</Typography>
						<Link color='inherit' to='/auth/login' component={RouterLink}>
							Login
						</Link>
					</Grid>
				</Grid>
			</form>
		</AuthLayout>
	);
};
