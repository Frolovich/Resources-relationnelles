import React, { useState } from "react";
import "./styles/login.css";

export default function Login() {
  const [language, setLanguage] = useState("fr");

  const texts = {
    fr: {
      title: "(Re)Sources Relationnelles",
      home: "Accueil",
      signup: "S'inscrire",
      subtitle: "Connectez-vous à votre compte.",
      formTitle: "Se connecter",
      email: "Email",
      password: "Mot de passe",
      submit: "Se connecter",
      noAccount: "Vous n'avez pas de compte ?",
      signupLink: "S'inscrire",
    },
    en: {
      title: "(Re)Sources Relationnelles",
      home: "Home",
      signup: "Sign up",
      subtitle: "Log in to your account.",
      formTitle: "Log in",
      email: "Email",
      password: "Password",
      submit: "Log in",
      noAccount: "Don't have an account?",
      signupLink: "Sign up",
    },
  };

  return (
    <div className="login-page">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">{texts[language].title}</div>

        <div className="nav-buttons">
          <a href="/">{texts[language].home}</a>
          <a href="/signup">{texts[language].signup}</a>

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

      {/* HERO */}
      <div className="login-hero">
        <h2>{texts[language].formTitle}</h2>
        <p>{texts[language].subtitle}</p>
      </div>

      {/* FORM */}
      <form className="login-form">
        <input
          type="email"
          placeholder={texts[language].email}
        />

        <input
          type="password"
          placeholder={texts[language].password}
        />

        <button type="submit">
          {texts[language].submit}
        </button>
      </form>

      {/* LINK TO SIGNUP */}
      <div className="login-link">
        <p>
          {texts[language].noAccount}{" "}
          <a href="/signup">
            {texts[language].signupLink}
          </a>
        </p>
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
