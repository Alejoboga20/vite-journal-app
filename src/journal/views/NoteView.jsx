import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Typography, TextField, IconButton } from '@mui/material';
import { SaveOutlined, UploadFileOutlined } from '@mui/icons-material';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

import { ImageGallery } from '../components';
import { useForm } from '../../hooks';
import { setActiveNote, startSavingNote } from '../../store/journal';

export const NoteView = () => {
	const fileInputRef = useRef();
	const dispatch = useDispatch();
	const { active: activeNote, messageSaved, isSaving } = useSelector((state) => state.journal);

	const { title, body, date, onInputChange, formState } = useForm(activeNote);

	const dateString = useMemo(() => {
		const newDate = new Date(date);

		return newDate.toUTCString();
	}, [date]);

	useEffect(() => {
		dispatch(setActiveNote(formState));
	}, [formState]);

	const onSaveNote = () => {
		dispatch(startSavingNote());
	};

	const onFileInputChange = ({ target }) => {
		if (target.files === 0) return;

		//dispatch(startUploadingFiles(target.files));
	};

	useEffect(() => {
		if (messageSaved.length > 0) {
			Swal.fire('Note Updated', messageSaved, 'success');
		}
	}, [messageSaved]);

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
				<input
					type='file'
					multiple
					ref={fileInputRef}
					onChange={onFileInputChange}
					style={{ display: 'none' }}
				/>

				<IconButton
					color='primary'
					disabled={isSaving}
					onClick={() => fileInputRef.current.click()}
				>
					<UploadFileOutlined />
				</IconButton>

				<Button
					disabled={isSaving}
					color='primary'
					sx={{ padding: 2 }}
					startIcon={<SaveOutlined sx={{ fontSize: 30, mr: 1 }} />}
					onClick={onSaveNote}
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
