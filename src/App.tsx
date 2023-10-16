import MainView from './components/mainview/MainView';
import {
  auth,
  emailAuthProvider,
  googleAuthProvider,
} from './firebase/firebase';
import { useRef, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

/* MUIの設定 -------------- */
export const theme = createTheme({
  palette: {
    primary: {
      main: '#155E75',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffffff',
    },
  },
});
/* ----------------------- */

function App() {
  const appRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    appRef.current.style.opacity = '1';
  }, []);

  return (
    <>
      <div
        ref={appRef}
        className="w-screen h-screen flex opacity-0 transition-opacity duration-[4s]"
      >
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <MainView />
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
