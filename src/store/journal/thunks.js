import { collection, doc, setDoc } from 'firebase/firestore/lite';

import { FirebaseDB } from '../../firebase/config';
import { loadNotes } from '../../helpers';
import { savingNewNote, addNewEmptyNote, setActiveNote, setNotes } from './';

export const startNewNote = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;

		dispatch(savingNewNote());

		const newNote = {
			title: '',
			body: '',
			date: new Date().getTime(),
		};

		const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
		const response = await setDoc(newDoc, newNote);

		newNote.id = newDoc.id;

		dispatch(addNewEmptyNote(newNote));
		dispatch(setActiveNote(newNote));
	};
};

export const startLoadingNotes = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;

		if (!uid) throw new Error('UID doesn not exist');
		const notes = await loadNotes(uid);

		dispatch(setNotes(notes));
	};
};
