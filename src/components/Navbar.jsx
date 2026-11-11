import { NavLink } from 'react-router-dom';
import { useApp } from '../context/useApp';

export default function Navbar() {
  const { language, setLanguage, theme, toggleTheme, t } = useApp();

  return (
    <>
      <a className="skip-link" href="#main-content">{t.skip}</a>
      <header className="site-header">
        <NavLink className="brand" to="/" aria-label={`${t.appName} — ${t.home}`}>
          <span className="brand-mark" aria-hidden="true">r.</span>
          <span>{t.appName}</span>
        </NavLink>
        <nav className="navbar" aria-label={language === 'de' ? 'Hauptnavigation' : 'Main navigation'}>
          <NavLink to="/" end>{t.home}</NavLink>
          <NavLink to="/category-search">{t.categories}</NavLink>
          <NavLink to="/about">{t.about}</NavLink>
        </nav>
        <div className="header-actions">
          <div className="language-toggle" role="group" aria-label={t.language}>
            <button type="button" aria-pressed={language === 'de'} onClick={() => setLanguage('de')}>DE</button>
            <span aria-hidden="true">/</span>
            <button type="button" aria-pressed={language === 'en'} onClick={() => setLanguage('en')}>EN</button>
          </div>
          <button
            type="button"
            className="theme-toggle"
            aria-label={`${t.theme}: ${theme === 'dark' ? t.dark : t.light}`}
            aria-pressed={theme === 'dark'}
            onClick={toggleTheme}
          >
            <span aria-hidden="true">{theme === 'dark' ? '☾' : '☼'}</span>
          </button>
        </div>
      </header>
    </>
  );
}
