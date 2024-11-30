import axios from 'axios';

const API_KEY = 'e55c664a851becfcb5e583f174db283c';
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export default tmdbApi;
