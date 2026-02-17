import { Link } from "react-router-dom";

export default function Footer() { //Esta función es para el pie de pagina que se encuentra en todas las paginas. Con las diferentes textos y enlaces.
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-col footer-brand">
          <div className="footer-logo">
            <span className="footer-mark">◎</span>
            <span className="footer-name">spinsoul</span>
          </div>
          <p className="footer-text">
            Your personal music dashboard. Track, rate and <br />
            curate your record collection.
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Navigate</h4>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/releases">Releases</Link>
            <Link to="/artists">Artists</Link>
            <Link to="/about">About</Link>
          </div>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Connect</h4>
          <div className="footer-links">
            <a href="#" onClick={(e) => e.preventDefault()}>Twitter</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Instagram</a>
            <a href="#" onClick={(e) => e.preventDefault()}>Discord</a>
          </div>
        </div>
      </div>

      <div className="footer-divider" />

      <div className="footer-bottom">© 2026 spinsoul. All rights reserved.</div>
    </footer>
  );
}
