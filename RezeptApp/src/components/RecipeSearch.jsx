import { useState } from 'react';
import "../Styles/RecipeSearch.css";

export default function RecipeSearch() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState(null);

  const fetchRecipes = () => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

    return fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error('Fehler beim Abrufen der Daten');
        }
        return response.json();
      })
      .then(data => {
        setRecipes(data.meals || []);
      })
      .catch(err => {
        console.error('Fehler:', err);
        setError('Fehler beim Abrufen der Daten. Bitte versuche es später erneut.');
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchRecipes();
  };

  const toggleRecipe = (index) => {
    setSelectedRecipeIndex(index === selectedRecipeIndex ? null : index);
  };

  return (
    <div className="recipe-search">
      <h1>Rezept Suche</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Suche nach Rezepten"
          className="search-input"
        />
        <button type="submit" className="search-button">Suchen</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <div className="recipes-grid">
        {recipes.map((recipe, index) => (
          <div key={recipe.idMeal} className="recipe-card">
            <h2 onClick={() => toggleRecipe(index)}>{recipe.strMeal}</h2>
            {recipe.strDrinkAlternate && <p><strong>Alternatives Getränk:</strong> {recipe.strDrinkAlternate}</p>}
            <p><strong>Kategorie:</strong> {recipe.strCategory}</p>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />
            {selectedRecipeIndex === index && (
              <div className="recipe-details">
                <p><strong>Region:</strong> {recipe.strArea}</p>
                <p><strong>Anleitung:</strong> {recipe.strInstructions}</p>
                {recipe.strYoutube && (
                  <a href={recipe.strYoutube} target="_blank" rel="noopener noreferrer">Video ansehen</a>
                )}
                <h3>Zutaten:</h3>
                <ul>
                  {Array.from({ length: 20 }, (_, i) => ({
                    ingredient: recipe[`strIngredient${i + 1}`],
                    measure: recipe[`strMeasure${i + 1}`],
                  }))
                    .filter(({ ingredient }) => ingredient)
                    .map(({ ingredient, measure }, i) => (
                      <li key={i}>{measure} {ingredient}</li>
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
