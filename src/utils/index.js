/* eslint-disable camelcase */
import axios from 'axios';

export const moviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`,
  },
});

// 1. Create a request Token
// 2. Ask the user for permission
// 3. Create a session ID
export async function fetchToken() {
  try {
    // 1
    const { data } = await moviesApi.get('/authentication/token/new');

    const { request_token } = data;

    if (data.success) {
      localStorage.setItem('request_token', request_token);

      // 2
      window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=https://filmpire-davelin.netlify.app/`;
    }
  } catch (error) {
    console.error('Sorry, your token could not be created.');
  }
}

// 3
// eslint-disable-next-line consistent-return
export async function getSessionId() {
  const token = localStorage.getItem('request_token');

  if (token) {
    try {
      const { data: { session_id } } = await moviesApi.post('authentication/session/new', { request_token: token });

      localStorage.setItem('session_id', session_id);

      return session_id;
    } catch (error) {
      console.log(error);
    }
  }
}
