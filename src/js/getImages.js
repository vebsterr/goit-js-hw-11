import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = ""; //вставь свой ключ

const instance = axios.create({
  baseURL: BASE_URL,
});

const params = {
  key: API_KEY,
  q: "",
  image_type: 'photo',
  orientation : 'horizontal',
  safesearch : true,
  per_page : 40,
  page : 1,
}

async function getImages() {
  try {
    return await instance.get(``, {params});
  } catch (error) {
    console.log(error);
  }  
}

export default {params, getImages}

