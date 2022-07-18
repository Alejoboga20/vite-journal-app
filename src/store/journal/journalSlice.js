import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
	name: 'journal',
	initialState: {
		isSaving: true,
		savedMessage: '',
		notes: [],
		active: {
			id: 'asd',
			title: '',
			body: '',
			date: 123,
			imageUrls: [''],
		},
	},
	reducers: {
		addNewEmptyNote: (state, action) => {},
		setActiveNote: (state, action) => {},
		setNotes: (state, action) => {},
		setSaving: (state, action) => {},
		updateNote: (state, action) => {},
		deleteNoteById: (state, action) => {},
	},
});

export const { addNewEmptyNote, setActiveNote } = journalSlice.actions;
