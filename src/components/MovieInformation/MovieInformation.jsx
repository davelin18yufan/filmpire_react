/* eslint-disable react/jsx-no-bind */
import React, { useState, useEffect } from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, Rating, styled } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, FavoriteBorderOutlined, Remove, ArrowBack, Favorite } from '@mui/icons-material';

import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import { MovieList } from '..';
import genreIcons from '../../assets/genres';
import { useGetMovieQuery, useGetRecommendationsQuery, useGetListQuery } from '../../services/TMDB';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { userSelector } from '../../features/auth';

const Poster = styled('img')(({ theme }) => ({
  borderRadius: '20px',
  boxShadow: '0.5em 1em 1em rgb(64, 64, 70)',
  width: '80%',
  [theme.breakpoints.down('md')]: {
    margin: '0 auto',
    width: '50%',
    // height: '350px',
  },
  [theme.breakpoints.down('sm')]: {
    margin: '0 auto',
    width: '100%',
    height: '350px',
    marginBottom: '30px',
  },
}));

const GenreImg = styled('img')(({ theme }) => ({
  filter: theme.palette.mode === 'dark' && 'invert(1)',
  marginRight: '10px',
}));

const CastImg = styled('img')(() => ({
  width: '100%',
  maxWidth: '7em',
  height: '8em',
  objectFit: 'cover',
  borderRadius: '10px',
}));

const StyledLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textDecoration: 'none',
  [theme.breakpoints.down('sm')]: {
    padding: '0,5rem 1rem',
  },
}));

const ButtonContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const TrailerIframe = styled('iframe')(({ theme }) => ({
  width: '50%',
  height: '50%',
  [theme.breakpoints.down('sm')]: {
    width: '90%',
    height: '90%',
  },
}));

const MovieInformation = () => {
  const [open, setOpen] = useState(false);
  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);
  const { id } = useParams();

  const dispatch = useDispatch();
  const { user } = useSelector(userSelector);

  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: favoriteMovies } = useGetListQuery({
    listName: 'favorite',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
  });
  const { data: watchListMovies } = useGetListQuery({
    listName: 'watchlist',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
  });
  const { data: recommendations } = useGetRecommendationsQuery({ list: '/recommendations', id });

  // !!{} -> false -> true, 'double negation'
  // force to return a boolean, not just truthy(empty object) or falsy
  useEffect(() => {
    setIsMovieFavorited(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [favoriteMovies, data]);
  // separate useEffect to prevent both state changed simultaneously
  useEffect(() => {
    setIsMovieWatchlisted(!!watchListMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [watchListMovies, data]);

  async function addToFavorite() {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      favorite: !isMovieFavorited,
    });
    setIsMovieFavorited((prev) => !prev);
  }

  async function addToWatchlist() {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_TMDB_KEY}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie',
      media_id: id,
      watchlist: !isMovieWatchlisted,
    });
    setIsMovieWatchlisted((prev) => !prev);
  }

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center">
        <Link to="/">Something has gone wrong..</Link>
      </Box>
    );
  }

  return (
    <Grid
      container
      sx={{
        display: 'flex', justifyContent: 'space-around', margin: '10px 0 !important',
      }}
    >
      {/* Movie Title */}
      <Grid item sm={12} lg={5} style={{ display: 'flex', marginBottom: '30px' }}>
        <Poster
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data?.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid
          item
          sx={{
            display: 'flex', justifyContent: 'space-around', margin: '10px 0 !important',
          }}
        >
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '10px' }}>
              {data.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min  | Language: {data?.spoken_languages[0].name}
          </Typography>
        </Grid>
        {/* Genres */}
        <Grid item sx={{ margin: '10px 0 !important', display: 'flex', justifyContent: 'space-between', flex: 'wrap' }}>
          {data?.genres?.map((genre) => (
            <StyledLink key={genre.name} to="/" onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
              <GenreImg src={genreIcons[genre.name.toLowerCase()]} height={30} />
              <Typography color="textPrimary" variant="subtitle1">
                {genre?.name}
              </Typography>
            </StyledLink>
          ))}
        </Grid>

        {/* Overview */}
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          OverView
        </Typography>
        <Typography style={{ marginBottom: '2rem' }}>
          {data?.overview}
        </Typography>

        {/* Cast */}
        <Typography variant="h5" gutterBottom>Top Cast</Typography>
        <Grid item container spacing={2}>
          {/* only show cast if picture exist */}
          {data && data.credits.cast.map((character, i) => (
            character.profile_path && (
            <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{ textDecoration: 'none' }}>
              <CastImg src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`} alt={character.name} />
              <Typography color="textPrimary">{character?.name}</Typography>
              <Typography color="textSecondary">
                {character.character.split('/')[0]}
              </Typography>
            </Grid>
            )
          )).slice(0, 6)}
          {/* show top 6 actors only */}
        </Grid>

        {/* Link Buttons */}
        <Grid item container sx={{ marginTop: '2rem' }}>
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            sx={{ flexDirection: { xs: 'column', sm: 'row' } }}
          >
            <ButtonContainer item xs={12} sm={6}>
              <ButtonGroup size="small" variant="outlined">
                <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>Website</Button>
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>IMDB</Button>
                <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>Trailer</Button>
              </ButtonGroup>
            </ButtonContainer>

            <ButtonContainer item xs={12} sm={6}>
              <ButtonGroup size="medium" variant="outlined">
                <Button onClick={addToFavorite} endIcon={isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                  {isMovieFavorited ? 'UnFavorite' : 'Favorite'}
                </Button>
                <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}>
                  WatchList
                </Button>
                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                  <Typography sx={{ textDecoration: 'none' }} component={Link} to="/" color="inherit" variant="subtitle2">Back</Typography>
                </Button>
              </ButtonGroup>
            </ButtonContainer>
          </Box>
        </Grid>
      </Grid>

      {/* Recommendation */}
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations ? <MovieList movies={recommendations} numberOfMovies={12} /> : <Box>Sorry, nothing found</Box>}
      </Box>

      {/* Trailer Modal */}
      <Modal
        closeAfterTransition
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex',
          justifyContent: 'center',
          alignItems: 'center' }}
      >
        {data?.videos?.results.length > 0
        && (
        <TrailerIframe
          autoPlay
          frameBorder="0"
          title="Trailer"
          src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
          allow="autoplay"
        />
        )}
      </Modal>
    </Grid>
  );
};

export default MovieInformation;
