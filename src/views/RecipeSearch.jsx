import { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/RecipeSearch.css";

export default function RecipeSearch() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [randomRecipe, setRandomRecipe] = useState(null);

  const fetchRecipes = () => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');
        return response.json();
      })
      .then(data => {
        if (data.meals) {
          setRecipes(data.meals);
          setError(null); 
        } else {
          setRecipes([]); 
          setError('Kein Rezept gefunden. Bitte versuche es mit einem anderen Suchbegriff.');
        }
        setRandomRecipe(null);
      })
      .catch(err => {
        console.error('Fehler:', err);
        setError('Fehler beim Abrufen der Daten. Bitte versuche es später erneut.');
      });
  };

  const fetchRandomRecipe = () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error('Fehler beim Abrufen der Daten');
        return response.json();
      })
      .then(data => {
        setRandomRecipe(data.meals[0]);
        setError(null); 
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
        <button type="button" onClick={fetchRandomRecipe} className="search-button">Zufälliges Rezept</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      {randomRecipe && (
        <div className="recipe-card random-recipe">
          <h2>{randomRecipe.strMeal}</h2>
          <img src={randomRecipe.strMealThumb} alt={randomRecipe.strMeal} className="recipe-image" />
          <div className="recipe-details">
            <p><strong>Kategorie:</strong> {randomRecipe.strCategory}</p>
            <p><strong>Region:</strong> {randomRecipe.strArea}</p>
            <p><strong>Anleitung:</strong> {randomRecipe.strInstructions}</p>
            <a href={randomRecipe.strYoutube} target="_blank">Video ansehen</a>
            <h3>Zutaten:</h3>
            <ul>
              {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => {
                const ingredient = randomRecipe[`strIngredient${i}`];
                const measure = randomRecipe[`strMeasure${i}`];
                return ingredient ? (
                  <li key={i}>{measure} {ingredient}</li>
                ) : null;
              })}
            </ul>
          </div>
        </div>
      )}
      <div className="recipes-grid">
        {recipes.length > 0 && recipes.map((recipe) => (
          <div key={recipe.idMeal} className="recipe-card">
            <h2>{recipe.strMeal}</h2>
            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />
            <Link to={`/recipe/details/${recipe.idMeal}`} className="view-details">Details ansehen</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
