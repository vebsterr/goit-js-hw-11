import './css/styles.css';
import API from './js/getImages';
import Notiflix from 'notiflix';
import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import card from './templates/card.hbs';
import refs from './js/refs';

refs.searchForm.addEventListener('submit', onFormSubmit);
refs.loadMoreBtn.addEventListener('click', loadMore);

const lightbox = new SimpleLightbox('.gallery a', {
  docClose: true,
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

function onFormSubmit(e) {
  API.params.page = 1;
  refs.gallery.innerHTML = '';
  API.params.q = e.currentTarget.elements.searchQuery.value;
  e.preventDefault();

  searchImg();
}

async function searchImg() {
  const result = await API.getImages();
  if (result.total === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    return;
  }
  totalOfImages(result.data.total);

  generateMarkup(result.data.hits);
}

function totalOfImages(total) {
  if (total) {
    Notiflix.Notify.success(`Hooray! We found ${total} images.`);
  }
}

function loadMore() {
  API.params.page += 1;

  searchImg();
}

function generateMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', card(images));
  refs.loadMoreBtn.classList.add('search-more--visible');

  lightbox.refresh();
}
