import { Button, Grid, Link, TextField, Typography } from '@mui/material';
import { Google } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

export const LoginPage = () => {
	return (
		<Grid
			container
			spacing={0}
			direction='column'
			alignItems='center'
			justifyContent='center'
			sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
		>
			<Grid
				item
				className='box-shadow'
				xs={3}
				sx={{ backgroundColor: 'white', padding: 3, borderRadius: 2 }}
			>
				<Typography variant='h5' sx={{ mb: 1 }}>
					Login
				</Typography>

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
			</Grid>
		</Grid>
	);
};
