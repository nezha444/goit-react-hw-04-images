import React, { useEffect, useState } from 'react';
import { Searchbar } from './Searchbar';
import '../styles.css';
import * as apiImages from './apiImages.js';
import { ImageGallery } from './ImageGallery';
import { Button } from './Button';
import { Modal } from './Modal';
import { Loader } from './Loader';

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [hiddenBtn, setHiddenBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImageURL, setlargeImageURL] = useState('');

  console.log('');
  useEffect(() => {
    if (query) {
      setIsLoading(true);

      apiImages
        .getImg(query, page)
        .then(data => {
          // data.data.hits --- Массив объектов с фото
          if (!data.data.hits.length) {
            console.log('Нет результатов', '😥');
            return;
          }
          console.log('Данные получены', data.data);
          setPhotos(prevPhotos => [...prevPhotos, ...data.data.hits]);
          setHiddenBtn(page < Math.ceil(data.data.totalHits / 12));
        })
        .catch(error => console.log(error))
        .finally(() => {
          // setTimeout(() => {
          setIsLoading(false);
          // }, 100);
        });
    }
  }, [page, query]);

  const submitForm = search => {
    if (query === search) return;
    setQuery(search);
    setPage(1);
    setPhotos([]);
    setHiddenBtn(false);
  };

  const handleClick = () => {
    setPage(prevPage => prevPage + 1);
  };

  const showModal = largeImageURL => {
    setlargeImageURL(largeImageURL);
  };

  return (
    <div className="App">
      <Searchbar submitForm={submitForm}></Searchbar>

      {isLoading && <Loader />}

      <ImageGallery showModal={showModal} photos={photos} />

      {hiddenBtn && <Button onClick={handleClick} />}

      {largeImageURL && (
        <Modal largeImageURL={largeImageURL} modalClose={showModal}></Modal>
      )}
    </div>
  );
};
