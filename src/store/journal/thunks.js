import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';

import { FirebaseDB } from '../../firebase/config';
import { loadNotes, uploadFile } from '../../helpers';
import {
	savingNewNote,
	addNewEmptyNote,
	setActiveNote,
	setNotes,
	setSaving,
	noteUpdated,
	setPhotosToActiveNote,
	deleteNoteById,
} from './';

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

export const startSavingNote = () => {
	return async (dispatch, getState) => {
		dispatch(setSaving());
		const { uid } = getState().auth;
		const { active: note } = getState().journal;
		const { id, title, body } = note;

		const noteToFirestore = { ...note };
		delete noteToFirestore.id;

		const docRef = doc(FirebaseDB, `${uid}/journal/notes/${id}`);
		await setDoc(docRef, noteToFirestore, { merge: true });

		dispatch(noteUpdated({ id, title, body }));
	};
};

export const startLoadingFiles = (files = []) => {
	return async (dispatch) => {
		dispatch(setSaving());

		const fileUploadPromises = [];
		for (const file of files) {
			fileUploadPromises.push(uploadFile(file));
		}

		const photoUrls = await Promise.all(fileUploadPromises);
		dispatch(setPhotosToActiveNote(photoUrls));
	};
};

export const startDeletingNote = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;
		const { active: note } = getState().journal;

		const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
		await deleteDoc(docRef);

		dispatch(deleteNoteById(note.id));
	};
};
