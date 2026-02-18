import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function Navbar({ query, setQuery, onAddRecord }) {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAddRecord = pathname.startsWith("/releases/new");

  const showToolbarPages =
    pathname === "/" ||
    pathname.startsWith("/releases") ||
    pathname.startsWith("/artists");

  const showSearch = showToolbarPages && !isAddRecord;
  const showAddButton = showToolbarPages && !isAddRecord;

  return (
    <header className="topbar">
      <div className="topbar-inner">
        {/* Mobile menu button */}
        <button
          className="menu-btn"
          aria-label="Open menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          ☰
        </button>

        <div className="brand">
          <span className="brand-mark" style={{ fontSize: 18 }}>◎</span>
          <span className="brand-text" style={{ fontSize: 18 }}>spinsoul</span>
        </div>

        <nav className="nav">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/releases">Releases</NavLink>
          <NavLink to="/artists">Artists</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>

        <div className="toolbar">
          {showSearch && (
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search..."
            />
          )}

          {showAddButton && (
            <button className="btn btn-add" onClick={onAddRecord}>
              ＋ Add Record
            </button>
          )}
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="mobile-menu" role="dialog" aria-label="Mobile menu">
          <NavLink to="/" end onClick={() => setMobileOpen(false)}>Home</NavLink>
          <NavLink to="/releases" onClick={() => setMobileOpen(false)}>Releases</NavLink>
          <NavLink to="/artists" onClick={() => setMobileOpen(false)}>Artists</NavLink>
          <NavLink to="/about" onClick={() => setMobileOpen(false)}>About</NavLink>
        </div>
      )}
    </header>
  );
}



// Importamos NavLink y useLocation de react-router-dom para crear un enlace a la página de detalles del artista
// Para el navbar hacemos que se muestre como en Footer y con un enlace a la página de detalles del artista
