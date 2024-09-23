import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


export default function CategorySearch() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(''); 
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Fehler beim Abrufen der Kategorien');
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data.categories);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fehler:', err);
        setError('Fehler beim Abrufen der Kategorien. Bitte versuche es später erneut.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setLoading(true);
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`;

      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Fehler beim Abrufen der Rezepte');
          }
          return response.json();
        })
        .then((data) => {
          setRecipes(data.meals);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Fehler:', err);
          setError('Fehler beim Abrufen der Rezepte. Bitte versuche es später erneut.');
          setLoading(false);
        });
    } else {
     
      setRecipes([]);
    }
  }, [selectedCategory]);

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setError(null);
  };

  return (
    <div className="category-search">
      <h1>Rezept Suche nach Kategorie</h1>
      
      {loading && <p>Laden...</p>}
      
      <div className="dropdown">
        <label htmlFor="category">Kategorie:</label>
        <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
          <option value="">Wähle eine Kategorie</option>
          {categories.map((category) => (
            <option key={category.idCategory} value={category.strCategory}>
              {category.strCategory}
            </option>
          ))}
        </select>
      </div>
      
      {error && <p className="error-message">{error}</p>}
      
      <div className="recipes-grid">
        {!loading && recipes.length === 0 && selectedCategory && (
          <p>Keine Rezepte in dieser Kategorie gefunden.</p>
        )}
        {recipes.map((recipe) => (
          <div key={recipe.idMeal} className="recipe-card">
            <h2>{recipe.strMeal}</h2>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />
            <Link to={`/recipe/details/${recipe.idMeal}`} className="view-details">
              Details ansehen
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
