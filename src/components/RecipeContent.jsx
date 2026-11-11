/* Recipe objects come from TheMealDB and their optional fields vary by endpoint. */
/* eslint-disable react/prop-types */
import { useApp } from '../context/useApp';
import { Link } from 'react-router-dom';

export function RecipeContent({ recipe }) {
  const { t } = useApp();
  const ingredients = Array.from({ length: 20 }, (_, index) => {
    const ingredient = recipe[`strIngredient${index + 1}`]?.trim();
    const measure = recipe[`strMeasure${index + 1}`]?.trim();
    return ingredient ? `${measure ? `${measure} ` : ''}${ingredient}` : null;
  }).filter(Boolean);

  return (
    <section className="recipe-content" aria-label={t.instructions}>
      <div className="recipe-meta">
        <span><strong>{t.categoryLabel}</strong>{recipe.strCategory}</span>
        <span><strong>{t.region}</strong>{recipe.strArea}</span>
      </div>
      <div className="recipe-body">
        <div>
          <h3>{t.instructions}</h3>
          <p className="instructions">{recipe.strInstructions}</p>
          {recipe.strYoutube && <a className="text-link" href={recipe.strYoutube} target="_blank" rel="noreferrer">{t.video} ↗</a>}
        </div>
        <div>
          <h3>{t.ingredients}</h3>
          <ul className="ingredient-list">{ingredients.map((ingredient, index) => <li key={`${index}-${ingredient}`}>{ingredient}</li>)}</ul>
        </div>
      </div>
    </section>
  );
}

export function RecipeCard({ recipe, detailLabel }) {
  return (
    <article className="recipe-card">
      <img src={recipe.strMealThumb} alt="" className="recipe-image" loading="lazy" />
      <div className="recipe-card-copy">
        <p className="card-category">{recipe.strCategory || recipe.strArea}</p>
        <h2>{recipe.strMeal}</h2>
        <Link to={`/recipe/details/${recipe.idMeal}`} className="view-details">
          {detailLabel}<span aria-hidden="true"> ↗</span>
        </Link>
      </div>
    </article>
  );
}
