import React, { useState, useEffect } from "react";
import "./styles/common.css";
import "./styles/account.css";

export default function Account() {
  const [language, setLanguage] = useState("fr");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const texts = {
    fr: {
      title: "(Re)Sources Relationnelles",
      home: "Accueil",
      logout: "Se déconnecter",
      welcome: "Bienvenue",
      accountTitle: "Mon compte",
      email: "Email",
      name: "Prénom",
      surname: "Nom",
      nickname: "Pseudo",
      city: "Ville",
      registeredAt: "Membre depuis",
      noNickname: "Non défini",
      noCity: "Non définie",
      errorLoad: "Impossible de charger le profil.",
      errorAuth: "Vous n'êtes pas connecté.",
    },
    en: {
      title: "(Re)Sources Relationnelles",
      home: "Home",
      logout: "Log out",
      welcome: "Welcome",
      accountTitle: "My account",
      email: "Email",
      name: "First name",
      surname: "Last name",
      nickname: "Nickname",
      city: "City",
      registeredAt: "Member since",
      noNickname: "Not set",
      noCity: "Not set",
      errorLoad: "Unable to load profile.",
      errorAuth: "You are not logged in.",
    },
  };

  const t = texts[language];

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setError(t.errorAuth);
      setLoading(false);
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      return;
    }

    // Décoder le token JWT pour obtenir l'email
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const email = payload.username;

      // Charger le profil depuis /api/me
      fetch("http://localhost:8000/api/me", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data) => {
          if (data.email) {
            setUser(data);
          } else {
            setError(t.errorLoad);
          }
        })
        .catch((err) => {
          console.error(err);
          setError(t.errorLoad);
        })
        .finally(() => setLoading(false));
    } catch (err) {
      console.error(err);
      setError(t.errorLoad);
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString(
      language === "fr" ? "fr-FR" : "en-US",
      { year: "numeric", month: "long", day: "numeric" }
    );
  };

  return (
    <div className="page">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">{t.title}</div>
        <div className="nav-buttons">
          <a href="/">{t.home}</a>
          <button className="btn-logout" onClick={handleLogout}>
            {t.logout}
          </button>
          <div
            className={`switch ${language === "en" ? "active" : ""}`}
            onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
          >
            <div className="circle"></div>
            <span>{language === "fr" ? "FR" : "EN"}</span>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="account-content">
        {loading && (
          <div className="account-loading">
            <div className="spinner"></div>
          </div>
        )}

        {error && !loading && (
          <div className="account-error">
            <span>⚠️ {error}</span>
          </div>
        )}

        {user && !loading && (
          <>
            {/* HERO */}
            <div className="account-hero">
              <div className="account-avatar">
                {user.name?.charAt(0).toUpperCase()}
                {user.surname?.charAt(0).toUpperCase()}
              </div>
              <h2>{t.welcome}, {user.name} !</h2>
              <p className="account-subtitle">{t.accountTitle}</p>
            </div>

            {/* PROFILE CARD */}
            <div className="account-card">
              <div className="account-field">
                <span className="field-key">{t.name}</span>
                <span className="field-value">{user.name}</span>
              </div>
              <div className="account-field">
                <span className="field-key">{t.surname}</span>
                <span className="field-value">{user.surname}</span>
              </div>
              <div className="account-field">
                <span className="field-key">{t.email}</span>
                <span className="field-value">{user.email}</span>
              </div>
              <div className="account-field">
                <span className="field-key">{t.nickname}</span>
                <span className="field-value muted">
                  {user.nickname || t.noNickname}
                </span>
              </div>
              <div className="account-field">
                <span className="field-key">{t.city}</span>
                <span className="field-value muted">
                  {user.city || t.noCity}
                </span>
              </div>
              <div className="account-field">
                <span className="field-key">{t.registeredAt}</span>
                <span className="field-value">
                  {formatDate(user.registeredAt)}
                </span>
              </div>
            </div>
          </>
        )}
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
