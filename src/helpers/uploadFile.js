export const uploadFile = async (file) => {
	if (!file) throw new Error('No File to upload');
	const cloudUrl = 'https://api.cloudinary.com/v1_1/finastra/upload';

	const formData = new FormData();
	formData.append('upload_preset', 'React-MUI-Journal');
	formData.append('file', file);

	try {
		const response = await fetch(cloudUrl, {
			method: 'POST',
			body: formData,
		});

		if (!response.ok) throw new Error('Unable to uplaod');

		const cloudResponse = await response.json();

		return cloudResponse.secure_url;
	} catch (error) {
		throw new Error(error.message);
	}
};
