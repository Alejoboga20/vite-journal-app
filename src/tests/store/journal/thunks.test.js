import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../../firebase/config';

import { addNewEmptyNote, savingNewNote, setActiveNote } from '../../../store/journal';
import { startNewNote } from '../../../store/journal/thunks';

const dispatch = jest.fn();
const getState = jest.fn();

jest.setTimeout(10000);

describe('JournalThunks Tests', () => {
	beforeEach(() => jest.clearAllMocks());

	test('startNewNote should create a new note', async () => {
		getState.mockReturnValue({ auth: { uid: 'ABC123' } });

		await startNewNote()(dispatch, getState);

		expect(dispatch).toHaveBeenCalledWith(savingNewNote());
		expect(dispatch).toHaveBeenCalledWith(
			addNewEmptyNote({ title: '', body: '', id: expect.any(String), date: expect.any(Number) })
		);
		expect(dispatch).toHaveBeenCalledWith(
			setActiveNote({ title: '', body: '', id: expect.any(String), date: expect.any(Number) })
		);

		const collectionRef = collection(FirebaseDB, 'ABC123/journal/notes');
		const docs = await getDocs(collectionRef);

		const deletePromises = [];
		docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));
		await Promise.all(deletePromises);
	});
});
