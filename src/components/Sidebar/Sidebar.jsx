import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListItemButton, ListSubheader, ListItemIcon, Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme, styled } from '@mui/material/styles';
import { classes } from './style';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const demoCategories = [
  { label: 'Comedy', value: 'comedy' },
  { label: 'Action', value: 'action' },
  { label: 'Horror', value: 'horror' },
  { label: 'Animation', value: 'animation' },
];

const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary,
}));

const Sidebar = ({ setMobileOpen }) => {
  const theme = useTheme();

  return (
    <>
      <Link
        to="/"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: '10% 0' }}
      >
        <img
          className={{ width: '70%' }}
          src={theme.palette.mode === 'light' ? redLogo : blueLogo}
          alt="Filmpire logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {demoCategories.map(({ label, value }) => (
          <StyledLink
            key={value}
            className={classes.links}
            to="/"
          >
            <ListItemButton onClick={() => {}}>
              {/* <ListItemIcon>
                <img src={redLogo} className={classes.genreImages} height={30} />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItemButton>
          </StyledLink>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {categories.map(({ label, value }) => (
          <StyledLink
            key={value}
            className={classes.links}
            to="/"
          >
            <ListItemButton onClick={() => {}}>
              {/* <ListItemIcon>
                <img src={redLogo} className={classes.genreImages} height={30} />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItemButton>
          </StyledLink>
        ))}
      </List>
    </>
  );
};

export default Sidebar;
