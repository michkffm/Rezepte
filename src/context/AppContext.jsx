/* eslint-disable react/prop-types */
import { useMemo, useState } from 'react';
import { AppContext } from './AppContextValue';

const translations = {
  de: {
    appName: 'RezeptKoch', home: 'Rezepte', categories: 'Kategorien', about: 'Über uns',
    searchTitle: 'Was kochen wir heute?', searchIntro: 'Finde dein nächstes Lieblingsgericht.',
    searchLabel: 'Rezept oder Zutat suchen', searchPlaceholder: 'Zum Beispiel: Pasta oder Hähnchen',
    search: 'Suchen', random: 'Überrasch mich', randomAria: 'Zufälliges Rezept entdecken',
    categoryTitle: 'Nach Kategorie stöbern', categoryIntro: 'Entdecke Gerichte aus deiner Lieblingsküche.',
    category: 'Kategorie', chooseCategory: 'Kategorie auswählen', details: 'Rezept ansehen',
    aboutTitle: 'Kochen verbindet.', aboutIntro: 'RezeptKoch hilft dir, neue Gerichte und Küchen aus aller Welt zu entdecken.',
    missionTitle: 'Unsere Mission', mission: 'Wir möchten dich dabei unterstützen, neue Gerichte auszuprobieren und verschiedene Küchen kennenzulernen – vom schnellen Alltagsessen bis zur besonderen Idee.',
    whyTitle: 'Was du hier findest', whySearch: 'Rezepte nach Namen durchsuchen.', whyRandom: 'Eine zufällige Rezeptidee entdecken.', whyCategories: 'Gerichte nach Kategorie erkunden.',
    ingredients: 'Zutaten', instructions: 'Zubereitung', categoryLabel: 'Kategorie', region: 'Küche',
    video: 'Video ansehen', loading: 'Wird geladen …', noResults: 'Keine Rezepte gefunden. Versuche einen anderen Suchbegriff.',
    emptyCategory: 'Wähle eine Kategorie, um passende Gerichte zu entdecken.', noCategoryResults: 'Für diese Kategorie wurden keine Rezepte gefunden.',
    searchError: 'Die Rezepte konnten gerade nicht geladen werden. Bitte versuche es erneut.',
    categoryError: 'Die Kategorien konnten gerade nicht geladen werden. Bitte versuche es erneut.',
    recipeError: 'Das Rezept konnte gerade nicht geladen werden. Bitte versuche es erneut.',
    language: 'Sprache', theme: 'Farbdarstellung', light: 'Hell', dark: 'Dunkel',
    skip: 'Zum Inhalt springen', results: 'Suchergebnisse', back: 'Zurück zu den Rezepten',
  },
  en: {
    appName: 'Recipe Kitchen', home: 'Recipes', categories: 'Categories', about: 'About',
    searchTitle: 'What shall we cook today?', searchIntro: 'Find your next favourite dish.',
    searchLabel: 'Search recipes or ingredients', searchPlaceholder: 'For example: pasta or chicken',
    search: 'Search', random: 'Surprise me', randomAria: 'Discover a random recipe',
    categoryTitle: 'Browse by category', categoryIntro: 'Explore dishes from the cuisines you love.',
    category: 'Category', chooseCategory: 'Choose a category', details: 'View recipe',
    aboutTitle: 'Cooking brings us together.', aboutIntro: 'Recipe Kitchen helps you discover dishes and cuisines from around the world.',
    missionTitle: 'Our mission', mission: 'We want to help you try new dishes and explore different cuisines, from quick everyday meals to ideas for special occasions.',
    whyTitle: 'What you can do here', whySearch: 'Search for recipes by name.', whyRandom: 'Discover a random recipe idea.', whyCategories: 'Explore dishes by category.',
    ingredients: 'Ingredients', instructions: 'Instructions', categoryLabel: 'Category', region: 'Cuisine',
    video: 'Watch video', loading: 'Loading …', noResults: 'No recipes found. Try a different search.',
    emptyCategory: 'Choose a category to discover matching dishes.', noCategoryResults: 'No recipes were found in this category.',
    searchError: 'Recipes could not be loaded right now. Please try again.',
    categoryError: 'Categories could not be loaded right now. Please try again.',
    recipeError: 'This recipe could not be loaded right now. Please try again.',
    language: 'Language', theme: 'Colour theme', light: 'Light', dark: 'Dark',
    skip: 'Skip to content', results: 'Search results', back: 'Back to recipes',
  },
};

export function AppProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('recipe-language') === 'en' ? 'en' : 'de');
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('recipe-theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const value = useMemo(() => ({
    language,
    t: translations[language],
    setLanguage: (next) => { localStorage.setItem('recipe-language', next); setLanguage(next); },
    theme,
    toggleTheme: () => setTheme((current) => {
      const next = current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('recipe-theme', next);
      return next;
    }),
  }), [language, theme]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
