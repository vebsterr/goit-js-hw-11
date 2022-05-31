import './css/styles.css';
import API from './js/getImages';
import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import card from './templates/card.hbs';

const refs = {
  searchInput: document.querySelector('input'),
  searchBtn: document.querySelector('button'),
  searchForm: document.querySelector('form'),
  gallery: document.querySelector('.gallery'),
  sentinel: document.querySelector('#sentinel'),
  preloader: document.querySelector('.preloader'),
  backToTopButton: document.querySelector('.back-to-top'),
  loadMoreBtn: document.querySelector('.search-more'),
};

refs.searchForm.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', loadMore);

function onFormSubmit(e) {
  API.params.page = 1;
  refs.gallery.innerHTML = '';
  API.params.q = e.currentTarget.elements.searchQuery.value;
  e.preventDefault();
  generateMarkup();

  totalOfImages();
  refs.loadMoreBtn.classList.add('search-more--visible');
}

function totalOfImages() {}

function loadMore() {
  API.params.page += 1;

  generateMarkup();
}

async function generateMarkup() {
  const result = await API.getImages();
  const arrayImg = result.data.hits;
  if (arrayImg.length === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    return;
  }
  refs.gallery.insertAdjacentHTML('beforeend', card(arrayImg));
}
