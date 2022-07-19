import { Box, Divider, Drawer, List, Typography, Toolbar } from '@mui/material';
import { useSelector } from 'react-redux';
import { SideBarItem } from './';

export const SideBar = ({ drawerWidth = 240 }) => {
	const { displayName } = useSelector((state) => state.auth);
	const { notes } = useSelector((state) => state.journal);

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
					{notes.map(({ title, body, id, date, imageUrls }) => (
						<SideBarItem
							title={title}
							body={body}
							id={id}
							date={date}
							imageUrls={imageUrls}
							key={id}
						/>
					))}
				</List>
			</Drawer>
		</Box>
	);
};
