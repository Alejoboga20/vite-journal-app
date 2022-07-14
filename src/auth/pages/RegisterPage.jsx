import { useState } from 'react';
import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import { useForm } from '../../hooks';
import { AuthLayout } from '../layout/AuthLayout';

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
							helperText={displayNameValid}
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
							helperText={emailValid}
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
							helperText={passwordValid}
							fullWidth
						/>
					</Grid>

					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12}>
							<Button variant='contained' fullWidth type='submit'>
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
