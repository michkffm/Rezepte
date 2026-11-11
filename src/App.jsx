import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AboutUs from './components/AboutUs';
import Navbar from './components/Navbar';
import { AppProvider } from './context/AppContext';
import { useApp } from './context/useApp';
import CategorySearch from './views/CategorySearch';
import RecipeDetail from './views/RecipeDetail';
import RecipeSearch from './views/RecipeSearch';
import './App.css';

function AppLayout() {
  const { language, theme } = useApp();

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className="app-shell" data-theme={theme}>
      <Navbar />
      <main id="main-content" className="App" tabIndex="-1">
        <Routes>
          <Route path="/" element={<RecipeSearch />} />
          <Route path="/recipe/details/:id" element={<RecipeDetail />} />
          <Route path="/category-search" element={<CategorySearch />} />
          <Route path="/about" element={<AboutUs />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <span aria-hidden="true">✳</span> {language === 'de' ? 'Gute Ideen beginnen in der Küche.' : 'Good ideas start in the kitchen.'}
      </footer>
    </div>
  );
}

export default function App() {
  return <AppProvider><AppLayout /></AppProvider>;
}
