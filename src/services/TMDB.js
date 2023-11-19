// api
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const tndbApiKey = process.env.TMDB_KEY;
const page = 1;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
    prepareHeaders: (headers) => headers.set('authorization', `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`),
  }),
  endpoints: (builder) => ({
    //* Get Movies by [Type]
    getMovies: builder.query({
      query: () => `/movie/popular?page=${page}`,
    }),
  }),
});

export const { useGetMoviesQuery } = tmdbApi;
