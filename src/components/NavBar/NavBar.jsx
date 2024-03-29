import { AccountCircle, Brightness4, Brightness7, Menu } from '@mui/icons-material';
import { AppBar, Avatar, Button, Drawer, IconButton, Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/system/Box';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import { Search, Sidebar } from '..';
import { ColorModeContext } from '../../utils/ToggleColorMode';
import { setUser, userSelector } from '../../features/auth';
import { fetchToken, getSessionId, moviesApi } from '../../utils';
import { classes } from './style';

const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  const theme = useTheme();
  const { toggleColorMode } = useContext(ColorModeContext);

  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(userSelector);

  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');

  // TODO: Replace query in useEffect and add ReactStrictMode
  useEffect(() => {
    //  check login status
    const loginUser = async () => {
      // approved and redirected
      if (token) {
        // if sessionID doesn't exist
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionIdFromLocalStorage}`);

          dispatch(setUser(userData));
        } else {
          const sessionId = await getSessionId();

          const { data: userData } = await moviesApi.get(`/account?session_id=${sessionId}`);

          dispatch(setUser(userData));
        }
      }
    };

    loginUser();
  }, [token]);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar sx={{
          height: '80px',
          display: 'flex',
          justifyContent: 'space-between',
          marginLeft: '240px',
          [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            flexWrap: 'wrap',
          },
        }}
        >
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              style={{ outline: 'none' }}
              onClick={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              sx={{
                marginRight: (themeArg) => themeArg.spacing(2),
                display: { sm: 'none' },
              }}
            >
              <Menu />
            </IconButton>
          )}
          <IconButton color="inherit" sx={{ ml: 1 }} onClick={toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}
          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <Button
                color="inherit"
                component={Link}
                to={`/profile/${user.id}`}
                sx={{
                  '&:hover': {
                    color: 'white !important',
                    textDecoration: 'none',
                  } }}
                onClick={() => {}}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  style={{ width: 30, height: 30 }}
                  alt="Profile"
                  src={`https://www.themoviedb.org/t/p/w64_and_h64_face${user?.avatar?.tmdb?.avatar_path}`}
                />
              </Button>
            )}
          </div>
          {isMobile && <Search />}
        </Toolbar>
      </AppBar>
      <div>
        <Box
          component="nav"
          sx={{ width: { sm: '240px' }, flexShrink: '0' }}
        >
          {isMobile ? (
            <Drawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              onClose={() => setMobileOpen((prevMobileOpen) => !prevMobileOpen)}
              classes={{ paper: classes.drawPaper }}
              ModalProps={{ keepMounted: true }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          ) : (
            <Drawer
              classes={{ paper: classes.drawPaper }}
              variant="permanent"
              open
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </Drawer>
          )}
        </Box>
      </div>
    </>
  );
};

export default NavBar;
