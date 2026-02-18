import { NavLink, useLocation } from "react-router-dom";
import SearchBar from "./SearchBar";

export default function Navbar({ query, setQuery, onAddRecord }) {
  const { pathname } = useLocation();

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
        <div className="brand">
          <span style={{ fontSize: 18 }}>◎</span>
          <span style={{ fontSize: 18 }}>spinsoul</span>
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
            <button className="btn" onClick={onAddRecord}>
              ＋ Add Record
            </button>
          )}
        </div>
      </div>
    </header>
  );
}


// Importamos NavLink y useLocation de react-router-dom para crear un enlace a la página de detalles del artista
// Para el navbar hacemos que se muestre como en Footer y con un enlace a la página de detalles del artista
