import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
import { AuthLayout } from '../layout/AuthLayout';

export const LoginPage = () => {
	return (
		<AuthLayout title='Login'>
			<form>
				<Grid container>
					<Grid item sx={{ mt: 2 }} xs={12}>
						<TextField label='email' type='email' placeholder='email@email.com' fullWidth />
					</Grid>
					<Grid item sx={{ mt: 2 }} xs={12}>
						<TextField label='password' type='password' placeholder='password' fullWidth />
					</Grid>

					<Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
						<Grid item xs={12} sm={6}>
							<Button variant='contained' fullWidth>
								Login
							</Button>
						</Grid>
						<Grid item xs={12} sm={6}>
							<Button variant='contained' fullWidth startIcon={<Google />}>
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
