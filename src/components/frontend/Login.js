import React, { useState } from "react";
import "./styles/common.css";
import "./styles/login.css";

export default function Login() {
  const [language, setLanguage] = useState("fr");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const texts = {
    fr: {
      title: "(Re)Sources Relationnelles",
      home: "Accueil",
      register: "S'inscrire",
      subtitle: "Connectez-vous à votre compte.",
      formTitle: "Se connecter",
      identifier: "Email ou pseudo",
      password: "Mot de passe",
      submit: "Se connecter",
      noAccount: "Vous n'avez pas de compte ?",
      registerLink: "S'inscrire",
      forgotPassword: "Mot de passe oublié ?",
      errorInvalid: "Identifiant ou mot de passe incorrect.",
      errorServer: "Erreur de connexion au serveur.",
      errorEmpty: "Veuillez remplir tous les champs.",
    },
    en: {
      title: "(Re)Sources Relationnelles",
      home: "Home",
      register: "Sign up",
      subtitle: "Log in to your account.",
      formTitle: "Log in",
      identifier: "Email or username",
      password: "Password",
      submit: "Log in",
      noAccount: "Don't have an account?",
      registerLink: "Sign up",
      forgotPassword: "Forgot password?",
      errorInvalid: "Invalid identifier or password.",
      errorServer: "Server connection error.",
      errorEmpty: "Please fill in all fields.",
    },
  };

  const t = texts[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError(t.errorEmpty);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      } else {
        setError(t.errorInvalid);
      }
    } catch {
      setError(t.errorServer);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">{t.title}</div>
        <div className="nav-buttons">
          <a href="/">{t.home}</a>
          <a href="/register">{t.register}</a>
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
      <div className="login-content">
        <div className="login-hero">
          <h2>{t.formTitle}</h2>
          <p>{t.subtitle}</p>
        </div>

        {/* FORM */}
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}

          <div className="form-group">
            <label>{t.identifier}</label>
            <input
              type="text"
              placeholder={t.identifier}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={error ? "error" : ""}
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label>{t.password}</label>
            <input
              type="password"
              placeholder={t.password}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={error ? "error" : ""}
            />
          </div>

          <div className="login-forgot">
            <a href="/forgot">{t.forgotPassword}</a>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "..." : t.submit}
          </button>
        </form>

        <div className="login-link">
          <p>
            {t.noAccount} <a href="/register">{t.registerLink}</a>
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
