import React, { useState, useEffect, useRef } from "react";
import "./styles/home.css";
import { getHomeMessage } from "../../services/api.js";

// Composant filtre réutilisable
function FilterDropdown({ language, filters, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // Fermer en cliquant en dehors
  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const labels = {
    fr: {
      newest: "Trier du plus récent",
      views: "Trier par vues",
      restricted: "Contenu restreint",
      filters: "Filtres",
    },
    en: {
      newest: "Newest first",
      views: "Sort by views",
      restricted: "Restricted content",
      filters: "Filters",
    },
  };

  const t = labels[language];

  return (
    <div className="filter-wrapper" ref={ref}>
      <button
        className={`filter-btn ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
        type="button"
      >
        ⚙️ {t.filters}
        <span className="filter-arrow">{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div className="dropdown">
          <label>
            <input
              type="checkbox"
              checked={filters.newest}
              onChange={() => onChange("newest")}
            />
            {t.newest}
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.views}
              onChange={() => onChange("views")}
            />
            {t.views}
          </label>
          <label>
            <input
              type="checkbox"
              checked={filters.restricted}
              onChange={() => onChange("restricted")}
            />
            {t.restricted}
          </label>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [language, setLanguage] = useState("fr");
  const [search, setSearch] = useState("");

  const [videoFilters, setVideoFilters] = useState({
    newest: false,
    views: false,
    restricted: false,
  });

  const [photoFilters, setPhotoFilters] = useState({
    newest: false,
    views: false,
    restricted: false,
  });

  useEffect(() => {
    getHomeMessage()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  }, []);

  const handleVideoFilter = (key) => {
    setVideoFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePhotoFilter = (key) => {
    setPhotoFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const texts = {
    fr: {
      register: "S'inscrire",
      login: "Se connecter",
      title: "(Re)Sources Relationnelles",
      search: "Rechercher...",
      hero: "Une communauté qui unit les personnes dans le respect et la bienveillance.",
      videos: "Vidéos",
      photos: "Photos",
    },
    en: {
      register: "Sign up",
      login: "Log in",
      title: "(Re)Sources Relationnelles",
      search: "Search...",
      hero: "A community that brings people together with respect and kindness.",
      videos: "Videos",
      photos: "Photos",
    },
  };

  const t = texts[language];

  return (
    <div>
      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">{t.title}</div>
        <div className="nav-buttons">
          <a href="/register">{t.register}</a>
          <a href="/login">{t.login}</a>
          <div
            className={`switch ${language === "en" ? "active" : ""}`}
            onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
          >
            <div className="circle"></div>
            <span>{language === "fr" ? "FR" : "EN"}</span>
          </div>
        </div>
      </header>

      {/* SEARCH */}
      <div className="search-bar">
        <input
          type="text"
          placeholder={t.search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* HERO */}
      <div className="hero">
        <p>{t.hero}</p>
      </div>

      {/* SECTIONS */}
      <div className="section">

        {/* VIDEOS */}
        <div className="section-block">
          <div className="section-block-header">
            <div className="section-title">🎥 {t.videos}</div>
            <FilterDropdown
              language={language}
              filters={videoFilters}
              onChange={handleVideoFilter}
            />
          </div>
          <div className="videos-section">
            {[1, 2, 3, 4].map((item) => (
              <div className="video-card" key={item}>
                <video
                  src={`/videos/video${item}.mp4`}
                  controls
                  className="video"
                />
                <div className="video-info">
                  <span>@user{item}</span>
                  <span>❤️ {100 + item * 10}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PHOTOS */}
        <div className="section-block">
          <div className="section-block-header">
            <div className="section-title">🖼️ {t.photos}</div>
            <FilterDropdown
              language={language}
              filters={photoFilters}
              onChange={handlePhotoFilter}
            />
          </div>
          <div className="photos-section">
            {[1, 2, 3, 4].map((item) => (
              <div className="photo-card" key={item}>
                <img
                  src={`/images/photo${item}.jpg`}
                  className="photo"
                  alt={`photo ${item}`}
                />
                <div className="photo-info">
                  <span>@user{item}</span>
                  <span>❤️ {50 + item * 20}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-column">
            <button>Contact</button>
            <button>Écrivez-nous</button>
          </div>
          <div className="footer-column">
            <button>À propos</button>
            <button>Plan du site</button>
          </div>
          <div className="footer-column">
            <button>Aide & Accessibilité</button>
            <button>Données personnelles</button>
          </div>
        </div>
      </footer>
    </div>
  );
}
