import { useState } from 'react';
import "../Styles/RecipeSearch.css"

export default function RecipeSearch() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(null);

  const YOUR_APP_ID = '06cb61e2';
  const YOUR_APP_KEY = '912d47a03a9ac53c4bb00e163440e283';

  const fetchRecipes = (query) => {
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${YOUR_APP_ID}&app_key=${YOUR_APP_KEY}`;
  
  
    return fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Fehler beim Abrufen der Daten');
        }
        return response.json();
      })
      .then((data) => {
        return data.hits;
      })
      .catch((err) => {
        throw err;
      });
  };

  const searchRecipes = () => {
    fetchRecipes(query)
      .then((data) => {
        setRecipes(data);
        setError(null); 
        setSelectedRecipeIndex(null); 
      })
      .catch((err) => {
        console.error('Fehler:', err);
        setError('Fehler beim Abrufen der Daten. Bitte versuche es später erneut.');
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchRecipes();
  };

  const toggleRecipe = (index) => {
    setSelectedRecipeIndex(index === selectedRecipeIndex ? null : index);
  };

  return (
    <div className="recipe-search">
      <h1>Zutaten Suche</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Suche nach Zutaten für Gerichte"
          className="search-input"
        />
        <button type="submit" className="search-button">Suchen</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <div className="recipes-grid">
        {recipes.length > 0 && recipes.map((recipe, index) => (
          <div key={index} className="recipe-card">
            <h2 onClick={() => toggleRecipe(index)}>{recipe.recipe.label}</h2>
            <img src={recipe.recipe.image} alt={recipe.recipe.label} className="recipe-image" />
            <p>{recipe.recipe.calories.toFixed(2)} Kalorien</p>
            {selectedRecipeIndex === index && (
              <div className="recipe-details">
                <h3>Zutaten:</h3>
                <ul>
                  {recipe.recipe.ingredientLines.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
