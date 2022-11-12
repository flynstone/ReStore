import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { useState } from 'react';
import Catalog from '../../features/catalog/Catalog';
import Header from './Header';
import '@fontsource/grandstander/300.css';
import '@fontsource/grandstander/400.css';
import '@fontsource/grandstander/500.css';
import '@fontsource/grandstander/700.css';
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import AboutPage from '../../features/about/AboutPage';
import ContactPage from '../../features/contact/ContactPage';
import ProductDetails from '../../features/catalog/ProductDetails';

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
      <Route exact path='/' component={HomePage} />
      <Route exact path='/catalog' component={Catalog} />
      <Route path='/catalog/:id' component={ProductDetails} />
      <Route path='/about' component={AboutPage} />
      <Route path='/contact' component={ContactPage} />
    </Container>
  </ThemeProvider>
  );
}

export default App;
