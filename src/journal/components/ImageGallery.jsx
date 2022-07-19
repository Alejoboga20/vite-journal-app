import { ImageList, ImageListItem } from '@mui/material';

export const ImageGallery = ({ images = [] }) => {
	return (
		<ImageList sx={{ width: '100%', height: 450 }} cols={4} rowHeight={200}>
			{images.map((image) => (
				<ImageListItem key={image}>
					<img
						loading='lazy'
						src={`${image}?w=164&h164&fit+crop&auto=format`}
						srcSet={`${image}?w=164&h164&fit+crop&auto=format&dpr=2 2x`}
						alt='Note Image'
					/>
				</ImageListItem>
			))}
		</ImageList>
	);
};
