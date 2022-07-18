import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
	name: 'journal',
	initialState: {
		isSaving: false,
		savedMessage: '',
		notes: [],
		active: null,
	},
	reducers: {
		savingNewNote: (state) => {
			state.isSaving = true;
		},
		addNewEmptyNote: (state, action) => {
			state.notes.push(action.payload);
			state.isSaving = false;
		},
		setActiveNote: (state, action) => {
			state.active = action.payload;
		},
		setNotes: (state, action) => {
			state.notes = action.payload;
		},
		setSaving: (state, action) => {
			state.isSaving = true;
		},
		noteUpdated: (state, action) => {
			const { id, title, body } = action.payload;

			state.isSaving = false;
			state.notes = state.notes.map((note) => (note.id === id ? { ...note, title, body } : note));
		},
		deleteNoteById: (state, action) => {},
	},
});

export const { savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, noteUpdated } =
	journalSlice.actions;
