import { uploadFile } from '../../helpers';

const imageUrl =
	'https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg';

describe('Test uploadFile', () => {
	test('should upload file to cloudinary', async () => {
		const response = await fetch(imageUrl);
		const blob = await response.blob();
		const file = new File([blob], 'test.jpg');

		const url = await uploadFile(file);
		console.log({ url });
		expect(typeof url).toBe('string');
	});
});
