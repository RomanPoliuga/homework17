const API_KEY = 'YOUR_API_KEY';
const BASE_URL = 'https://pixabay.com/api/';

const gallery = document.getElementById('gallery');
const loadMoreBtn = document.getElementById('loadMore');

let page = Number(localStorage.getItem('page')) || 1;
const perPage = 12;


async function fetchImages() {
  const url = `${BASE_URL}?key=${API_KEY}&editors_choice=true&page=${page}&per_page=${perPage}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    renderImages(data.hits);

    localStorage.setItem('page', page);
  } catch (error) {
    console.error('Помилка завантаження зображень:', error);
  }
}


function renderImages(images) {
  const markup = images
    .map(
      image => `
      <li>
        <img src="${image.webformatURL}" alt="${image.tags}">
      </li>
    `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
}


loadMoreBtn.addEventListener('click', () => {
  page += 1;
  fetchImages();
});


fetchImages();
