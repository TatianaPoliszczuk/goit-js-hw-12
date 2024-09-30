import { fetchImages } from './js/pixabay-api.js';
import { renderGallery, showInfo, showError } from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import axios from 'axios';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loader = document.getElementById('loader');
let lightbox = new SimpleLightbox('.gallery a');

const loadMoreButton = document.getElementById('load-more');

let page = 1;
let searchQuery = '';

loader.classList.add('is-hidden');

form.addEventListener('submit', async event => {
  event.preventDefault();

  searchQuery = event.currentTarget.elements.searchQuery.value.trim();
  page = 1;

  if (!searchQuery) {
    showError('Please enter a search term.');
    return;
  }

  gallery.innerHTML = '';
  loadMoreButton.classList.add('hidden');

  // console.log('Adding is-hidden to loader');
  loader.classList.remove('is-hidden');

  await loadImages();

  // console.log('Removing is-hidden from loader');
  loader.classList.add('is-hidden');
});

async function loadImages() {
  try {
    const data = await fetchImages(searchQuery, page);
    renderGallery(data.hits);
    lightbox.refresh();
    toggleLoadMoreButton(data.hits.length);

    if (page * 15 >= data.totalHits) {
      showInfo("We're sorry, but you've reached the end of search results.");
      loadMoreButton.classList.add('hidden');
    }
  } catch (error) {
    showError('Failed to load images.');
  }
}

function toggleLoadMoreButton(resultsCount) {
  if (resultsCount < 15) {
    loadMoreButton.classList.add('hidden');
  } else {
    loadMoreButton.classList.remove('hidden');
  }
}

loadMoreButton.addEventListener('click', async () => {
  page += 1;
  loader.classList.remove('is-hidden');
  await loadImages();
  loader.classList.add('is-hidden');
  scrollPage();
});

function scrollPage() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
