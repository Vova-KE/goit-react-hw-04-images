import { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from "./Button";
import ImageGallery from "./ImageGallery";
import Loader from "./Loader";
import Modal from "./Modal";
import SearchBar from "./SearchBar";

const BASE_URL = 'https://pixabay.com/api/';
const MY_API_KEY = '27785613-3c730127b1356d079421a0eb8';  
const searchParams = new URLSearchParams({
    image_type: "photo",
    orientation: "horizontal",
});

export const App = () => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [per_page, setPer_page] = useState(12);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPhoto, setModalPhoto] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (!query) {
      return;
    }

    setIsLoading(true);

    fetch(`${BASE_URL}?q=${query}&page=${page}&key=${MY_API_KEY}&${searchParams}&per_page=${per_page}`)
      .then(response => response.json())
      .then(photos => {
        if (photos.hits.length === 0) {
          toast.error('There are no photos');
        }

        setPhotos(prevState => [...prevState, ...photos.hits])
        setIsVisible(page < Math.ceil(photos.totalHits / per_page));
      })
      .catch(error => error)
      .finally(() => {
        setIsLoading(false);
      });
  },[page, per_page, query])

  const handleSearchSubmit = (inputQuery) => {
    if (query === inputQuery) {
      toast.error(`You already find ${query}`);
      return;
  }
  
    setQuery(inputQuery);
    setPage(1);
    setPhotos([]);
    setIsVisible(false);
  };

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const onClickPhoto = (largeImageURL,tags) => {
    setModalPhoto(largeImageURL);
    setTags(tags);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {isLoading && <Loader />}
      <ImageGallery photos={photos} onClickPhoto={onClickPhoto} />
      {isVisible && <Button isLoading={isLoading} onClick={handleLoadMore} />}
      {isModalOpen && <Modal modalPhoto={modalPhoto} onModalClose={handleModalClose} />}
      
      <ToastContainer autoClose={2000}/>
    </div>
  );
};