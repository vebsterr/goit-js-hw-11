import './css/styles.css';
import API from './js/getImages';
import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
// import refs from './js/refs';

const refs = {
  searchInput: document.querySelector('input'),
  searchBtn: document.querySelector('button'),
  searchForm: document.querySelector('form'),
  gallery: document.querySelector('.gallery'),
  sentinel: document.querySelector('#sentinel'),
  preloader: document.querySelector('.preloader'),
  backToTopButton: document.querySelector('.back-to-top'),
};

refs.searchForm.addEventListener('submit', onFormSubmit);
