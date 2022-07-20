import { startNewNote } from '../../../store/journal/thunks';

const dispatch = jest.fn();
const getState = jest.fn();

describe('JournalThunks Tests', () => {
	beforeEach(() => jest.clearAllMocks());

	test('startNewNote should create a new note', async () => {
		getState.mockReturnValue({ auth: { uid: 'ABC123' } });

		await startNewNote()(dispatch, getState);
	});
});
