import React, { useEffect, useState, useRef } from 'react';
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
  const prevQueryRef = useRef();
  const prevPageRef = useRef();
  const prevPhotosRef = useRef();

  const prevQuery = prevQueryRef.current;
  const prevPage = prevPageRef.current;
  const prevPhotos = prevPhotosRef.current;

  useEffect(() => {
    if (prevQuery !== query || prevPage !== page) {
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
    setPage(prevPage + 1);
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

// export class App extends Component {
//   state = {
//     query: '',
//     page: 1,
//     photos: [],
//     hiddenBtn: false,
//     isLoading: false,
//     largeImageURL: '',
//   };

//   componentDidUpdate(prevProps, prevState) {
//     if (
//       prevState.query !== this.state.query ||
//       prevState.page !== this.state.page
//     ) {
//       this.setState({
//         isLoading: true,
//       });
//       apiImages
//         .getImg(this.state.query, this.state.page)
//         .then(data => {
//           // data.data.hits --- Массив объектов с фото
//           if (!data.data.hits.length) {
//             console.log('Нет результатов', '😥');
//             return;
//           }
//           console.log('Данные получены', data.data);
//           this.setState(prevState => ({
//             photos: [...prevState.photos, ...data.data.hits],
//             hiddenBtn: this.state.page < Math.ceil(data.data.totalHits / 12),
//           }));
//         })
//         .catch(error => console.log(error))
//         .finally(() => {
//           // setTimeout(() => {
//           this.setState({
//             isLoading: false,
//           });
//           // }, 100);
//         });
//     }
//   }

//   submitForm = query => {
//     if (this.state.query === query) return;
//     this.setState({ query, page: 1, photos: [], hiddenBtn: false });
//   };

//   handleClick = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   showModal = largeImageURL => {
//     this.setState({ largeImageURL });
//   };

//   render() {
//     return (
//       <div className="App">
//         <Searchbar submitForm={this.submitForm}></Searchbar>

//         {this.state.isLoading && <Loader />}

//         <ImageGallery showModal={this.showModal} photos={this.state.photos} />

//         {this.state.hiddenBtn && <Button onClick={this.handleClick} />}

//         {this.state.largeImageURL && (
//           <Modal
//             largeImageURL={this.state.largeImageURL}
//             modalClose={this.showModal}
//           ></Modal>
//         )}
//       </div>
//     );
//   }
// }
