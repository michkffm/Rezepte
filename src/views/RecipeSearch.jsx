import { useState } from 'react';
import { useApp } from '../context/useApp';
import { RecipeCard, RecipeContent } from '../components/RecipeContent';

export default function RecipeSearch() {
  const { language, t } = useApp();
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');
  const [randomRecipe, setRandomRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const fetchRecipes = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setRandomRecipe(null);
    setSearched(true);
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(query.trim())}`);
      if (!response.ok) throw new Error('Recipe search request failed');
      const data = await response.json();
      setRecipes(data.meals || []);
    } catch {
      setError(t.searchError);
      setRecipes([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchRandomRecipe = async () => {
    setLoading(true);
    setError('');
    setRecipes([]);
    setSearched(false);
    try {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
      if (!response.ok) throw new Error('Random recipe request failed');
      const data = await response.json();
      setRandomRecipe(data.meals?.[0] || null);
      if (!data.meals?.[0]) setError(t.searchError);
    } catch {
      setError(t.searchError);
      setRandomRecipe(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="recipe-search page-section">
      <section className="search-hero" aria-labelledby="search-title">
        <div className="hero-copy">
          <p className="eyebrow"><span aria-hidden="true">✳</span> {t.appName}</p>
          <h1 id="search-title">{t.searchTitle}</h1>
          <p className="hero-intro">{t.searchIntro}</p>
          <form onSubmit={fetchRecipes} className="search-form" role="search">
            <label htmlFor="recipe-query">{t.searchLabel}</label>
            <div className="search-controls">
              <input
                id="recipe-query"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t.searchPlaceholder}
                className="search-input"
              />
              <button type="submit" className="search-button" disabled={loading}>
                {t.search}<span aria-hidden="true"> ↗</span>
              </button>
            </div>
            <button type="button" onClick={fetchRandomRecipe} className="random-button" disabled={loading}>
              <span aria-hidden="true">✳</span> {t.random}
            </button>
          </form>
        </div>
        <div className="hero-art" aria-hidden="true">
          <span className="art-spark spark-one">✳</span>
          <span className="art-spark spark-two">·</span>
          <div className="plate"><div className="plate-center"><span>r.</span></div></div>
          <span className="art-note">{language === 'de' ? <>Gutes Essen<br />gute Laune</> : <>good food<br />good mood</>}</span>
        </div>
      </section>

      {(loading || error || (searched && !recipes.length)) && (
        <p className={error ? 'status-message error-message' : 'status-message'} role={error ? 'alert' : 'status'} aria-live="polite">
          {error || (loading ? t.loading : t.noResults)}
        </p>
      )}

      {randomRecipe && (
        <section className="random-recipe result-panel" aria-labelledby="random-recipe-title">
          <div className="random-heading"><p className="eyebrow">{t.random}</p><h2 id="random-recipe-title">{randomRecipe.strMeal}</h2></div>
          <img src={randomRecipe.strMealThumb} alt={randomRecipe.strMeal} className="recipe-image" />
          <RecipeContent recipe={randomRecipe} />
        </section>
      )}

      {recipes.length > 0 && (
        <section className="results-section" aria-labelledby="results-title" aria-live="polite">
          <div className="section-heading"><p className="eyebrow">{t.results}</p><h2 id="results-title">{recipes.length} {t.results.toLocaleLowerCase()}</h2></div>
          <div className="recipes-grid">{recipes.map((recipe) => <RecipeCard key={recipe.idMeal} recipe={recipe} detailLabel={t.details} />)}</div>
        </section>
      )}
    </div>
  );
}
