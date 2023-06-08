import PropTypes from 'prop-types';

import 'react-loading-skeleton/dist/skeleton.css';

export const ImageGalleryItem = ({ showModal, el, key }) => {
  return (
    <li
      key={key}
      style={{ height: '260px' }}
      className="ImageGalleryItem"
      onClick={() => showModal(el.largeImageURL)}
    >
      <img className="ImageGalleryItem-image" src={el.webformatURL} alt="img" />
    </li>
  );
};
ImageGalleryItem.propTypes = {
  showModal: PropTypes.func.isRequired,
  el: PropTypes.object.isRequired,
};
