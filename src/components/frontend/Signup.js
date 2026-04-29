import React, { useState } from "react";
import "./styles/signup.css";

export default function Signup() {
  const [language, setLanguage] = useState("fr");


  const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  nickname: "",
  email: "",
  city: "",
  birthdate: "",
  password: "",
  confirmPassword: "",
});

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

  const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log(data);

    alert("Compte créé avec succès !");
  } catch (error) {
    console.error("Erreur:", error);
  }
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
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder={texts[language].firstName}
            value={formData.firstName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder={texts[language].lastName}
            value={formData.lastName}
            onChange={handleChange}
           />
          <input
            type="text"
            name="nickname"
            placeholder={texts[language].nickname}
            value={formData.nickname}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder={texts[language].email}
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="text"
            name="city"
            placeholder={texts[language].city}
            value={formData.city}
            onChange={handleChange}
          />
          <input
            type="date"
            name="birthdate"
            value={formData.birthdate}
            onChange={handleChange}
          />
           <input
            type="password"
            name="password"
            placeholder={texts[language].password}
            value={formData.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder={texts[language].confirmPassword}
            value={formData.confirmPassword}
            onChange={handleChange}
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