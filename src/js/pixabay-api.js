import axios from 'axios';

const API_KEY = '46122633-b5d9525daa165f05b8fce4913';
const BASE_URL = 'https://pixabay.com/api/';

export async function fetchImages(query, page = 1) {
  const url = `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=15&page=${page}`;

  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}
