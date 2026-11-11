import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { RecipeContent } from '../components/RecipeContent';
import { useApp } from '../context/useApp';

export default function RecipeDetail() {
  const { id } = useParams();
  const { t } = useApp();
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setRecipe(null);
    setError(false);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${encodeURIComponent(id)}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Recipe request failed');
        return response.json();
      })
      .then((data) => {
        if (!data.meals?.[0]) throw new Error('Recipe not found');
        setRecipe(data.meals[0]);
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(true);
      });
    return () => controller.abort();
  }, [id]);

  if (error) return <section className="page-section detail-loading" role="alert"><p className="status-message error-message">{t.recipeError}</p><Link className="view-details" to="/">{t.back}</Link></section>;
  if (!recipe) return <p className="page-section status-message detail-loading" role="status" aria-live="polite">{t.loading}</p>;

  return (
    <article className="recipe-detail page-section">
      <Link className="back-link" to="/">← {t.back}</Link>
      <header className="detail-heading"><p className="eyebrow">{recipe.strArea} · {recipe.strCategory}</p><h1>{recipe.strMeal}</h1></header>
      <img src={recipe.strMealThumb} alt={recipe.strMeal} className="detail-image" />
      <RecipeContent recipe={recipe} />
    </article>
  );
}
