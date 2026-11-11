import { useEffect, useState } from 'react';
import { RecipeCard } from '../components/RecipeContent';
import { useApp } from '../context/useApp';

export default function CategorySearch() {
  const { t } = useApp();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError('');
    fetch('https://www.themealdb.com/api/json/v1/1/categories.php', { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Category request failed');
        return response.json();
      })
      .then((data) => setCategories(data.categories || []))
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError('categories');
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  useEffect(() => {
    if (!selectedCategory) {
      setRecipes([]);
      setError('');
      return undefined;
    }
    const controller = new AbortController();
    setLoading(true);
    setError('');
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(selectedCategory)}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Recipe category request failed');
        return response.json();
      })
      .then((data) => setRecipes(data.meals || []))
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError('recipes');
      })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [selectedCategory, t.searchError]);

  return (
    <div className="category-search page-section">
      <section className="page-intro" aria-labelledby="category-title">
        <p className="eyebrow"><span aria-hidden="true">02</span> {t.appName}</p>
        <h1 id="category-title">{t.categoryTitle}</h1>
        <p className="hero-intro">{t.categoryIntro}</p>
      </section>
      <div className="category-picker">
        <label htmlFor="category">{t.category}</label>
        <select id="category" value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} disabled={loading && !categories.length}>
          <option value="">{t.chooseCategory}</option>
          {categories.map((category) => <option key={category.idCategory} value={category.strCategory}>{category.strCategory}</option>)}
        </select>
      </div>
      {loading && <p className="status-message" role="status" aria-live="polite">{t.loading}</p>}
      {error && <p className="status-message error-message" role="alert">{error === 'categories' ? t.categoryError : t.searchError}</p>}
      {!loading && !error && !selectedCategory && <p className="empty-prompt">{t.emptyCategory}</p>}
      {!loading && !error && selectedCategory && !recipes.length && <p className="empty-prompt">{t.noCategoryResults}</p>}
      {recipes.length > 0 && <section className="recipes-grid" aria-label={`${selectedCategory} ${t.results}`} aria-live="polite">{recipes.map((recipe) => <RecipeCard key={recipe.idMeal} recipe={recipe} detailLabel={t.details} />)}</section>}
    </div>
  );
}
