import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import SearchBar from "./SearchBar";

// Navbar is a "layout component"
// It appears on all pages and adapts based on the current route

export default function Navbar({ query, setQuery, onAddRecord }) {

  // ------------------------------------------------------------
  // useLocation gives us the current URL path
  // Example: "/", "/artists", "/releases/new"
  // We use this to decide what UI elements should appear
  // ------------------------------------------------------------
  const { pathname } = useLocation();

  // Controls mobile dropdown visibility
  const [mobileOpen, setMobileOpen] = useState(false);


  // ------------------------------------------------------------
  // PAGE DETECTION LOGIC
  // ------------------------------------------------------------

  // True only in the create record page
  const isAddRecord = pathname.startsWith("/releases/new");

  // Pages where toolbar tools should exist
  // (search + add button)
  const showToolbarPages =
    pathname === "/" ||
    pathname.startsWith("/releases") ||
    pathname.startsWith("/artists");

  // Hide search when creating a record (focus on the form)
  const showSearch = showToolbarPages && !isAddRecord;

  // Hide add button while already adding a record
  const showAddButton = showToolbarPages && !isAddRecord;


  return (
    <header className="topbar">
      <div className="topbar-inner">

        {/* ------------------------------------------------------------
            MOBILE MENU BUTTON
            Toggles dropdown navigation on small screens
        ------------------------------------------------------------ */}
        <button
          className="menu-btn"
          aria-label="Open menu"
          onClick={() => setMobileOpen((v) => !v)}
        >
          ☰
        </button>


        {/* BRAND / LOGO */}
        <div className="brand">
          <span className="brand-mark" style={{ fontSize: 18 }}>
            ◎
          </span>
          <span className="brand-text" style={{ fontSize: 18 }}>
            spinsoul
          </span>
        </div>


        {/* ------------------------------------------------------------
            MAIN NAVIGATION
            NavLink automatically applies an "active" state
        ------------------------------------------------------------ */}
        <nav className="nav">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/releases">Releases</NavLink>
          <NavLink to="/artists">Artists</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>


        {/* ------------------------------------------------------------
            TOOLBAR AREA (dynamic)
            Shows search and add button depending on page
        ------------------------------------------------------------ */}
        <div className="toolbar">

          {/* SearchBar controlled by parent state */}
          {showSearch && (
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search..."
            />
          )}

          {/* Button triggers navigation handled by parent */}
          {showAddButton && (
            <button className="btn btn-add" onClick={onAddRecord}>
              ＋ Add Record
            </button>
          )}
        </div>
      </div>


      {/* ------------------------------------------------------------
          MOBILE DROPDOWN MENU
          Only visible when mobileOpen = true
          Clicking a link closes the menu
      ------------------------------------------------------------ */}
      {mobileOpen && (
        <div className="mobile-menu" role="dialog" aria-label="Mobile menu">
          <NavLink to="/" end onClick={() => setMobileOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/releases" onClick={() => setMobileOpen(false)}>
            Releases
          </NavLink>
          <NavLink to="/artists" onClick={() => setMobileOpen(false)}>
            Artists
          </NavLink>
          <NavLink to="/about" onClick={() => setMobileOpen(false)}>
            About
          </NavLink>
        </div>
      )}
    </header>
  );
}