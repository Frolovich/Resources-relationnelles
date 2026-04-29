import React, { useState, useEffect } from "react";
import "./styles/home.css";
import { getHomeMessage } from "../../services/api.js";

export default function Home() {
  const [language, setLanguage] = useState("fr");
  const [search, setSearch] = useState("");
 
  
useEffect(() => {
  getHomeMessage()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
}, []);

  const texts = {
    fr: {
      register: "S'inscrire",
      login: "Se connecter",
      title: "(Re)Sources Relationnelles",
      search: "Rechercher...",
    },
    en: {
      register: "Sign up",
      login: "Log in",
      title: "(Re)Sources Relationnelles",
      search: "Search...",
    },
  };

  return (
    <div>
      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">{texts[language].title}</div>

        <div className="nav-buttons">
          <a href="/register">{texts[language].register}</a>
          <a href="/login">{texts[language].login}</a>

          <div
            className={`switch ${language === "en" ? "active" : ""}`}
            onClick={() =>
              setLanguage(language === "fr" ? "en" : "fr")
            }
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
          placeholder={texts[language].search}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* HERO */}
      <div className="hero">
        <p>
          {language === "fr"
            ? "Une communauté qui unit les personnes dans le respect et la bienveillance."
            : "A community that brings people together with respect and kindness"}
        </p>
      </div>

      {/* 🔥 VIDEO + FILTER */}
      <div className="section">

        <div className="block-header">
          <div className="filter-icon">
            ⚙️ <span>Filters</span>

            <div className="dropdown">
              <label>
                <input type="checkbox" />
                {language === "fr"
                  ? "Trier du plus récent"
                  : "Newest first"}
              </label>

              <label>
                <input type="checkbox" />
                {language === "fr"
                  ? "Trier par vues"
                  : "Sort by views"}
              </label>

              <label>
                <input type="checkbox" />
                {language === "fr"
                  ? "Contenu restreint"
                  : "Restricted content"}
              </label>
            </div>
          </div>
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

        {/* 🖼 FILTER + PHOTOS */}
        <div className="block-header">
          <div className="filter-icon">
            ⚙️ <span>Filters</span>

            <div className="dropdown">
              <label>
                <input type="checkbox" />
                {language === "fr"
                  ? "Trier du plus récent"
                  : "Newest first"}
              </label>

              <label>
                <input type="checkbox" />
                {language === "fr"
                  ? "Trier par vues"
                  : "Sort by views"}
              </label>

              <label>
                <input type="checkbox" />
                {language === "fr"
                  ? "Contenu restreint"
                  : "Restricted content"}
              </label>
            </div>
          </div>
        </div>

        <div className="photos-section">
          {[1, 2, 3, 4].map((item) => (
            <div className="photo-card" key={item}>
              <img
                src={`/images/photo${item}.jpg`}
                className="photo"
                alt=""
              />
              <div className="photo-info">
                <span>@user{item}</span>
                <span>❤️ {50 + item * 20}</span>
              </div>
            </div>
          ))}
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