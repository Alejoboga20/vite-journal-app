import { useMemo } from 'react';
import { TurnedInOutlined } from '@mui/icons-material';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

export const SideBarItem = ({ title = '', body = '' }) => {
	const newTitle = useMemo(
		() => (title.length > 13 ? title.substring(0, 13) + '...' : title),
		[title]
	);

	return (
		<ListItem>
			<ListItemButton>
				<ListItemIcon>
					<TurnedInOutlined />
				</ListItemIcon>
				<Grid container>
					<ListItemText primary={newTitle} />
					<ListItemText secondary={body} />
				</Grid>
			</ListItemButton>
		</ListItem>
	);
};
