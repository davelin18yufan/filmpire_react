import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, styled } from '@mui/material';
import { Link } from 'react-router-dom';

const StyledLink = styled(Link)(() => ({
  marginBottom: '20px', display: 'flex', justifyContent: 'center', height: '490px', textDecoration: 'none',
}));

const FeaturedMovie = ({ movie }) => {
  if (!movie) return null;

  return (
    <StyledLink to={`/movie/${movie.id}`}>
      <Card sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end', flexDirection: 'column', position: 'relative' }} classes={{ root: { position: 'relative !important' } }}>
        <CardMedia
          alt={movie.title}
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          title={movie.title}
          sx={{ position: 'absolute', top: 0, right: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.575)', backgroundBlendMode: 'darken' }}
        />

        <Box padding="20px">
          <CardContent
            sx={{ color: '#fff', width: { xs: '100%', sm: '50%' }, zIndex: '99 !important', position: 'absolute', bottom: '0', left: 0 }}
            classes={{ root: { position: 'relative', backgroundColor: 'transparent' } }}
          >
            <Typography variant="h5" gutterBottom>{movie.title}</Typography>
            <Typography variant="body2">{movie.overview}</Typography>
          </CardContent>
        </Box>
      </Card>
    </StyledLink>
  );
};

export default FeaturedMovie;
