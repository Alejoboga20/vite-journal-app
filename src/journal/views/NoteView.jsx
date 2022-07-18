import { useSelector } from 'react-redux';
import { Button, Grid, Typography, TextField } from '@mui/material';
import { SaveOutlined } from '@mui/icons-material';

import { ImageGallery } from '../components';
import { useForm } from '../../hooks';
import { useMemo } from 'react';

export const NoteView = () => {
	const { active: activeNote } = useSelector((state) => state.journal);

	const { title, body, date, onInputChange } = useForm(activeNote);

	const dateString = useMemo(() => {
		const newDate = new Date(date);

		return newDate.toUTCString();
	}, [date]);

	return (
		<Grid
			container
			className='animate__animated animate__fadeIn animate__faster'
			direction='row'
			justifyContent='space-between'
			sx={{ mb: 1 }}
		>
			<Grid item>
				<Typography fontSize={39} fontWeight='light'>
					{dateString}
				</Typography>
			</Grid>
			<Grid item>
				<Button
					color='primary'
					sx={{ padding: 2 }}
					startIcon={<SaveOutlined sx={{ fontSize: 30, mr: 1 }} />}
				>
					Save
				</Button>
			</Grid>

			<Grid container>
				<TextField
					type='text'
					variant='filled'
					fullWidth
					placeholder='Enter a title'
					label='Title'
					name='title'
					value={title}
					onChange={onInputChange}
					sx={{ border: 'none', mb: 1 }}
				/>
				<TextField
					type='text'
					variant='filled'
					fullWidth
					multiline
					placeholder='Enter a note'
					label='Note'
					sx={{ border: 'none', mb: 1 }}
					minRows={5}
					name='body'
					value={body}
					onChange={onInputChange}
				/>
			</Grid>

			<ImageGallery />
		</Grid>
	);
};
