 import React, { useState } from "react";
import "./styles/signup.css";

export default function Signup() {
  const [language, setLanguage] = useState("fr");

  const texts = {
    fr: {
      title: "(Re)Sources Relationnelles",
      home: "Accueil",
      login: "Se connecter",
      subtitle: "Rejoignez une communauté bienveillante et sécurisée.",
      formTitle: "Créer un compte",
      firstName: "Prénom",
      lastName: "Nom",
      nickname: "Pseudo",
      password: "Mot de passe",
      confirmPassword: "Confirmer le mot de passe",
      email: "Email",
      city: "Ville",
      birthdate: "Date de naissance",
      submit: "S'inscrire",
    },
    en: {
      title: "(Re)Sources Relationnelles",
      home: "Home",
      login: "Log in",
      subtitle: "Join a safe and respectful community.",
      formTitle: "Create an account",
      firstName: "First name",
      lastName: "Last name",
      nickname: "Nickname",
      password: "Password",
      confirmPassword: "Confirm password",
      email: "Email",
      city: "City",
      birthdate: "Birth date",
      submit: "Sign up",
    },
  };

  return (
    <div className="signup-page">
      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">{texts[language].title}</div>

        <div className="nav-buttons">
          <a href="/">{texts[language].home}</a>
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

      {/* CONTENT */}
      <div className="content">
        {/* TEXT */}
        <div className="signup-hero">
          <h2>{texts[language].formTitle}</h2>
          <p>{texts[language].subtitle}</p>
        </div>

        {/* FORM */}
        <form className="signup-form">
          <input type="text" placeholder={texts[language].firstName} />
          <input type="text" placeholder={texts[language].lastName} />
          <input type="text" placeholder={texts[language].nickname} />

          <input type="email" placeholder={texts[language].email} />
          <input type="text" placeholder={texts[language].city} />

          <input type="date" />

          <input type="password" placeholder={texts[language].password} />
          <input
            type="password"
            placeholder={texts[language].confirmPassword}
          />

          <button type="submit">{texts[language].submit}</button>
        </form>

        {/* LOGIN LINK */}
        <div className="login-link">
          <p>
            {language === "fr"
              ? "Vous avez déjà un compte ?"
              : "Already have an account?"}{" "}
            <a href="/login">
              {language === "fr" ? "Se connecter" : "Log in"}
            </a>
          </p>
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