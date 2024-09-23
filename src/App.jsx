import RecipeSearch from "./Views/RecipeSearch";
import RecipeDetail from './Views/RecipeDetail';
import CategorySearch from './Views/CategorySearch'; 
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
