import { NavLink, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Navbar({ query, setQuery, onAddRecord }) {
  const location = useLocation();

  // Solo mostramos la barra de búsqueda en Releases (igual que el diseño)
  const showSearch = location.pathname.startsWith("/releases");

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="brand">
          <span style={{ fontSize: 18 }}>◎</span>
          <span style={{ fontSize: 18 }}>spinsoul</span>
        </div>

        <nav className="nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/releases">Releases</NavLink>
          <NavLink to="/artists">Artists</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>

        <div className="toolbar">
          {showSearch && (
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search records..."
            />
          )}

          <button className="btn" onClick={onAddRecord}>
            ＋ Add Record
          </button>
        </div>
      </div>
    </header>
  );
}
