import { Component } from "react";
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

export class App extends Component {
  state = {
    query: '',
    page: 1,
    photos: [],
    isVisible: false,
    error: null,
    isLoading: false,
    per_page: 12,
    isModalOpen: false,
    modalPhoto: '',
  };

  componentDidUpdate(_, prevState) {
    const { query, page, per_page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.setState({ isLoading: true });

      fetch(`${BASE_URL}?q=${query}&page=${page}&key=${MY_API_KEY}&${searchParams}&per_page=${per_page}`)
        .then(response => response.json())
        .then(photos => {
          if (photos.hits.length === 0) {
            toast.error('There are no photos');
          }

          this.setState(prevState => ({
            photos: [...prevState.photos, ...photos.hits],
            isVisible: page < Math.ceil(photos.totalHits / per_page),
          }));
        })
        .catch(error => error)
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  };

  handleSearchSubmit = (query) => {
    if (this.state.query === query) {
      toast.error(`You already find ${query}`);
      return;
  }

    this.setState({
      query,
      page: 1,
      photos: [],
      isVisible: false,
    })    
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1
    }));
  };

  onClickPhoto = (url) => {
    this.setState({
      modalPhoto: url,
      isModalOpen: true,
    });
  };

  handleModalClose = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { photos, isVisible, isLoading, isModalOpen, modalPhoto } = this.state;

    return (
      <div>
        <SearchBar onSubmit={this.handleSearchSubmit} />
        {isLoading && <Loader />}
        <ImageGallery photos={photos} onClickPhoto={this.onClickPhoto} />
        {isVisible && <Button isLoading={isLoading} onClick={this.handleLoadMore} />}
        {isModalOpen && <Modal modalPhoto={modalPhoto} onModalClose={this.handleModalClose} />}
        
        <ToastContainer autoClose={2000}/>
      </div>
    );
  }
};