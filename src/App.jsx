import RecipeSearch from "./views/RecipeSearch";
import RecipeDetail from './views/RecipeDetail';
import CategorySearch from './views/CategorySearch'; 
import Navbar from './components/Navbar'; 
import "./App.css";
import { Route, Routes } from 'react-router-dom';
import AboutUs from "./components/AboutUs";
function App() {
  return (
   <>
      <Navbar /> 
      <div className="App">
        <Routes>
          <Route path="/" element={<RecipeSearch />} />
          <Route path="/recipe/details/:id" element={<RecipeDetail />} />
          <Route path="/category-search" element={<CategorySearch />} /> 
          <Route path="/about" element={<AboutUs />} /> 
        </Routes>
      </div>
      </>
  );
}

export default App;
