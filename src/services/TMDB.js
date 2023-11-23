// api
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.themoviedb.org/3',
    prepareHeaders: (headers) => headers.set('authorization', `Bearer ${process.env.REACT_APP_TMDB_TOKEN}`),
  }),
  endpoints: (builder) => ({
    //* Get Genres
    getGenres: builder.query({
      query: () => '/genre/movie/list',
    }),
    //* Get Movies by [Type]
    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        //* Get Movie By Search
        if (searchQuery) {
          return `/search/movie?query=${searchQuery}&page=${page}`;
        }

        //* Get Movies By Category
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          return `/movie/${genreIdOrCategoryName}?page=${page}`;
        }

        //* Get Movies By Genre
        if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          return `/discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}`;
        }

        //* Default: Get Popular Movies
        return `/movie/popular?page=${page}`;
      },
    }),
    //* Get Movie
    getMovie: builder.query({
      // multiple request consolidation
      query: (id) => `/movie/${id}?append_to_response=videos,credits`,
    }),
    //* Get User List
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) => `/account/${accountId}/${listName}/movies?page=${page || 1}&sort_by=created_at.asc&session_id=${sessionId}`,
    }),
    //* Get Recommendations
    getRecommendations: builder.query({
      query: ({ id, list }) => `movie/${id}/${list}`,
    }),
    //* Get Actor Details
    getActorDetails: builder.query({
      query: (id) => `/person/${id}`,
    }),
    //* Get Movie By Actor
    getMovieByActor: builder.query({
      query: ({ id, page }) => `discover/movie?sort_by=popularity.desc&with_cast=${id}&page=${page || 1}`,
    }),
  }),
});

export const { useGetMoviesQuery, useGetGenresQuery, useGetMovieQuery, useGetRecommendationsQuery, useGetActorDetailsQuery, useGetMovieByActorQuery, useGetListQuery } = tmdbApi;
