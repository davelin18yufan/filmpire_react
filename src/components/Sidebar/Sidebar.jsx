import React, { useEffect } from 'react';
import { Divider, List, ListItemText, ListItemButton, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme, styled } from '@mui/material/styles';
import { useGetGenresQuery } from '../../services/TMDB';

import genreIcons from '../../assets/genres';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
}));

const LogoLink = styled(Link)(() => ({
  display: 'flex',
  justifyContent: 'center',
  padding: '10% 0',
}));

const GenreImg = styled('img')(({ theme }) => ({
  filter: theme.palette.mode === 'dark' && 'invert(1)',
  marginRight: '10px',
}));

const GenreIcon = styled('img')(({ theme }) => ({
  filter: theme.palette.mode === 'dark' && 'invert(1)',
}));

const Sidebar = ({ setMobileOpen }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { genreIdOrCategoryName } = useSelector((state) => state.currentGenreOrCategory);
  const { data, isFetching } = useGetGenresQuery();

  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);

  return (
    <>
      <LogoLink to="/">
        <img
          style={{ width: '70%' }}
          src={theme.palette.mode === 'light' ? redLogo : blueLogo}
          alt="Filmpire logo"
        />
      </LogoLink>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <StyledLink
            key={value}
            to="/"
          >
            <ListItemButton onClick={() => dispatch(selectGenreOrCategory(value))}>
              <ListItemIcon>
                <GenreIcon src={genreIcons[label.toLowerCase()]} height={30} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </StyledLink>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : data.genres.map(({ id, name }) => (
          <StyledLink
            key={id}
            to="/"
          >
            <ListItemButton onClick={() => dispatch(selectGenreOrCategory(id))}>
              <ListItemIcon>
                <GenreImg src={genreIcons[name.toLowerCase()]} height={30} />
              </ListItemIcon>
              <ListItemText primary={name} />
            </ListItemButton>
          </StyledLink>
        ))}

      </List>
    </>
  );
};

export default Sidebar;
