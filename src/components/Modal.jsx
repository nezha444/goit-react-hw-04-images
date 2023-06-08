import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

export const Modal = ({ largeImageURL, modalClose }) => {
  const handleOverlayClick = event => {
    if (event.target === event.currentTarget) {
      modalClose('');
    }
  };

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === 'Escape') {
        modalClose('');
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return document.removeEventListener('keydown', handleKeyDown);
  }, [modalClose]);

  return (
    <div
      onClick={handleOverlayClick}
      style={{
        width: '100%',
        height: '100%',
        position: 'fixed',
        top: 0,
        left: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba( 0, 0, 0, 0.7 )',
      }}
    >
      <img src={largeImageURL} alt="img" width="50%" />
    </div>
  );
};
Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  modalClose: PropTypes.func.isRequired,
};
