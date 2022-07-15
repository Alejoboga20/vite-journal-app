import {
	Box,
	Divider,
	Drawer,
	Grid,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	ListItemIcon,
	Typography,
	Toolbar,
} from '@mui/material';
import { TurnedInOutlined } from '@mui/icons-material';
import { useSelector } from 'react-redux';

export const SideBar = ({ drawerWidth = 240 }) => {
	const { displayName } = useSelector((state) => state.auth);

	return (
		<Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
			<Drawer
				variant='permanent'
				open
				sx={{
					display: { xs: 'block' },
					padding: '10px',
					'& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
				}}
			>
				<Toolbar>
					<Typography variant='h6' noWrap component='div'>
						{displayName}
					</Typography>
				</Toolbar>
				<Divider />

				<List>
					{['January', 'February', 'March', 'April'].map((text) => (
						<ListItem key={text}>
							<ListItemButton>
								<ListItemIcon>
									<TurnedInOutlined />
								</ListItemIcon>
								<Grid container>
									<ListItemText primary={text} />
									<ListItemText secondary={'dasddasdasdsadasdas'} />
								</Grid>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			</Drawer>
		</Box>
	);
};
