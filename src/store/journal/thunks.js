import { collection, doc, setDoc } from 'firebase/firestore/lite';

import { FirebaseDB } from '../../firebase/config';
import { savingNewNote, addNewEmptyNote, setActiveNote } from './';

export const startNewNote = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;

		dispatch(savingNewNote());

		const newNote = {
			title: '',
			bodu: '',
			date: new Date().getTime(),
		};

		const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
		const response = await setDoc(newDoc, newNote);

		newNote.id = newDoc.id;

		dispatch(addNewEmptyNote(newNote));
		dispatch(setActiveNote(newNote));
	};
};
