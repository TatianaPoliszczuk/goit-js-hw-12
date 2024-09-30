import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `
      <li class="gallery-item">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" class="images"/>
        </a>
        <div class="info">
          <p><b>Likes:</b> ${likes}</p>
          <p><b>Views:</b> ${views}</p>
          <p><b>Comments:</b> ${comments}</p>
          <p><b>Downloads:</b> ${downloads}</p>
        </div>
      </li>
    `
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

export function showError(message) {
  iziToast.error({
    message,
    position: 'topRight',
    backgroundColor: '#EF4040',
    messageColor: '#FFFFFF',
    close: true,
  });
}

export function showInfo(message) {
  iziToast.info({
    message,
    position: 'topRight',
    backgroundColor: '#EF4040',
    messageColor: '#FFFFFF',
    close: true,
  });
}
