import { Container, createTheme, CssBaseline, ThemeProvider, Typography } from '@mui/material';
import { useState } from 'react';
import Catalog from '../../features/catalog/Catalog';
import Header from './Header';
import '@fontsource/grandstander/300.css';
import '@fontsource/grandstander/400.css';
import '@fontsource/grandstander/500.css';
import '@fontsource/grandstander/700.css';


function App() {
  const [darkMode, setDarkMode] = useState(false);
  const paletteType  = darkMode ? 'dark' : 'light'
  const theme = createTheme({
    typography: {
      fontFamily: [
        'Grandstander'
      ].join(','),
    },
    palette: {
      mode: paletteType,
      background: {
        default: paletteType === 'light' ? '#eaeaea' : '#121212'
      }
    }
  })

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  }
  
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
    <Container>
      <Catalog />
    </Container>
  </ThemeProvider>
  );
}

export default App;
