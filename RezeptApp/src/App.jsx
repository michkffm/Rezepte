import RecipeSearch from './components/RecipeSearch';
import useThemeToggle from "./components/ThemeToggle";
import "./App.css";


function App() {
  const [isDarkMode, toggleTheme] = useThemeToggle();

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      <button onClick={toggleTheme} className="theme-toggle-button">
        {isDarkMode ? "Heller Modus" : "Dunkler Modus"}
      </button>
      <RecipeSearch />
    </div>
  );
}

export default App;
