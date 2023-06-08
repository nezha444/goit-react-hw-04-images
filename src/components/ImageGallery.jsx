import PropTypes from 'prop-types';

import { ImageGalleryItem } from './ImageGalleryItem';

export const ImageGallery = ({ photos, showModal }) => {
  return (
    <ul className="ImageGallery">
      {photos.map(el => (
        <ImageGalleryItem
          key={el.id}
          el={el}
          showModal={showModal}
        ></ImageGalleryItem>
      ))}
    </ul>
  );
};
ImageGallery.propTypes = {
  photos: PropTypes.array.isRequired,
  showModal: PropTypes.func.isRequired,
};
