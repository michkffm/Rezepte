import RecipeSearch from './components/RecipeSearch';
import RecipeDetail from './components/RecipeDetail';
import CategorySearch from './components/CategorySearch'; 
import Navbar from './components/Navbar'; 
import "./App.css";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
   <>
      <Navbar /> 
      <div className="App">
        <Routes>
          <Route path="/" element={<RecipeSearch />} />
          <Route path="/recipe/details/:id" element={<RecipeDetail />} />
          <Route path="/category-search" element={<CategorySearch />} /> 
        </Routes>
      </div>
      </>
  );
}

export default App;
