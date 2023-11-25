import { useEffect, useContext, useRef } from 'react';
import alanBtn from '@alan-ai/alan-sdk-web';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ColorModeContext } from '../../utils/ToggleColorMode';
import { fetchToken } from '../../utils';
import { selectGenreOrCategory, searchMovie } from '../../features/currentGenreOrCategory';

const key = process.env.REACT_APP_ALAN_SDK_KEY;

const Alan = () => {
  const { setMode } = useContext(ColorModeContext);
  const alanBtnContainer = useRef();
  const dispatch = useDispatch();
  const go = useNavigate();

  useEffect(() => {
    const alanBtnInstance = alanBtn({
      key,
      rootEl: alanBtnContainer.current,
      onButtonState: async (status) => {
        let isFirst = true;
        if (status === 'ONLINE' && isFirst) {
          await alanBtnInstance.activate();
          alanBtnInstance.playText("Hello! I'm Alan. How can I help you?");
          isFirst = false;
        }
      },
      onCommand: async ({ command, mode, genres, genreOrCategory, query }) => {
        // Call the client code that will react to the received command

        switch (command) {
          case 'changeMode':
            if (mode === 'light') {
              setMode('light');
            } else {
              setMode('dark');
            }
            break;

          case 'login':
            await fetchToken();
            break;

          case 'logout':
            localStorage.clear();
            go('/');
            break;

          case 'chooseGenre':
            // eslint-disable-next-line no-case-declarations
            const foundGenre = genres?.find((g) => g.name.toLowerCase() === genreOrCategory.toLowerCase());
            //  genre or category(Top_rated | popular | upcoming)
            if (foundGenre) {
              go('/');
              dispatch(selectGenreOrCategory(foundGenre.id));
            } else {
              const category = genreOrCategory.startsWith('top') ? 'top_rated' : genreOrCategory;
              go('/');
              dispatch(selectGenreOrCategory(category));
            }
            break;

          case 'search':
            dispatch(searchMovie(query));
            break;

          default:
            break;
        }
      },
    });
  }, []);
  return <div ref={alanBtnContainer} />;
};

export default Alan;
