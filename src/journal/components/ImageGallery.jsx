import { ImageList, ImageListItem } from '@mui/material';

export const ImageGallery = ({ itemData = [] }) => {
	return (
		<ImageList sx={{ width: '100%', height: 450 }} cols={4} rowHeight={200}>
			{itemData.map((item) => (
				<ImageListItem key={item.img}>
					<img loading='lazy' src='' />
				</ImageListItem>
			))}
		</ImageList>
	);
};
