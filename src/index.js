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

async function onFormSubmit(e) {
  API.params.page = 1;
  refs.gallery.innerHTML = '';
  API.params.q = e.currentTarget.elements.searchQuery.value;
  e.preventDefault();

  const result = await API.getImages();
  if (data.total === 0) {
    if (result?.data?.total === 0) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.',
      );
      return;
    }
    totalOfImages(data.total);

    generateMarkup(result?.data?.hits);
  }
}

function totalOfImages(total) {
  if (total) {
    Notiflix.Notify.success(`Hooray! We found ${total} images.`);
  }
}

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
  refs.loadMoreBtn.classList.add('search-more--visible');

  lightbox.refresh();
}
