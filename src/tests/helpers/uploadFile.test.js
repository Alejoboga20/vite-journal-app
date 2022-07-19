import { v2 as cloudinary } from 'cloudinary';
import { uploadFile } from '../../helpers';

cloudinary.config({
	cloud_name: 'finastra',
	api_key: '245889453199165',
	api_secret: 'bS-xIf2Qts5ZxixbHLRPETnmJvA',
	secure: true,
});

const imageUrl =
	'https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg';

describe('Test uploadFile', () => {
	test('should upload file to cloudinary', async () => {
		const response = await fetch(imageUrl);
		const blob = await response.blob();
		const file = new File([blob], 'test.jpg');

		const url = await uploadFile(file);
		const segments = url.split('/');
		const imageId = segments[segments.length - 1].replace('.jpg', '');

		expect(typeof url).toBe('string');

		await cloudinary.api.delete_resources(['journal-app/' + imageId], { resource_type: 'image' });
	});

	test('should return null', async () => {
		const file = new File([], 'test.jpg');
		const url = await uploadFile(file);

		expect(url).toBe(null);
	});
});
