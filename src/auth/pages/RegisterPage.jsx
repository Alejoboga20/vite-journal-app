import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';

export const RegisterPage = () => {
	return (
		<AuthLayout title='Register'>
			<form>
				<Grid container>
					<Grid item sx={{ mt: 2 }} xs={12}>
						<TextField label='Name' type='text' placeholder='fullname' fullWidth />
					</Grid>
					<Grid item sx={{ mt: 2 }} xs={12}>
						<TextField label='Email' type='email' placeholder='email@email.com' fullWidth />
					</Grid>
					<Grid item sx={{ mt: 2 }} xs={12}>
						<TextField label='Password' type='password' placeholder='password' fullWidth />
					</Grid>

					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12}>
							<Button variant='contained' fullWidth>
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
