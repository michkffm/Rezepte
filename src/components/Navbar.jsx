import { NavLink } from 'react-router-dom';
import "./Styles/Navbar.css"; 

export default function Navbar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end>Rezept Suche</NavLink>
      <NavLink to="/category-search">Kategorie Suche</NavLink> 
      <NavLink to="/about">Über uns</NavLink>
      <NavLink to="/contact">Kontakt</NavLink>
    </nav>
  );
}
