import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { TurnedInOutlined } from '@mui/icons-material';
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { setActiveNote } from '../../store/journal';

export const SideBarItem = ({ title = '', body = '', id, date, imageUrls = [] }) => {
	const dispatch = useDispatch();

	const newTitle = useMemo(
		() => (title.length > 13 ? title.substring(0, 13) + '...' : title),
		[title]
	);

	const onSelectNote = () => {
		dispatch(
			setActiveNote({
				title,
				body,
				id,
				date,
				imageUrls,
			})
		);
	};

	return (
		<ListItem>
			<ListItemButton onClick={onSelectNote}>
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
