import React, { useState, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import "./styles/signup.css";

// Composant tooltip réutilisable
function Tooltip({ text }) {
  const [visible, setVisible] = useState(false);
  return (
    <span
      className="tooltip-wrapper"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <span className="tooltip-icon">?</span>
      {visible && <span className="tooltip-box">{text}</span>}
    </span>
  );
}

// Composant label bilingue avec tooltip
function FieldLabel({ fr, en, language, tooltip }) {
  return (
    <div className="field-label">
      <span className="label-fr">{fr}</span>
      <span className="label-sep"> / </span>
      <span className="label-en">{en}</span>
      {tooltip && <Tooltip text={language === "fr" ? tooltip.fr : tooltip.en} />}
    </div>
  );
}

export default function Signup() {
  const [language, setLanguage] = useState("fr");
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    nickname: "",
    email: "",
    city: "",
    birthdate: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    privacyPolicyAccepted: false,
    cookiesAccepted: false,
    marketingConsent: false,
  });

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (!cookiesAccepted) {
      setShowCookieBanner(true);
    }
  }, []);

  // Définition des champs avec labels bilingues et tooltips
  const fields = [
    {
      name: "name",
      type: "text",
      fr: "Prénom",
      en: "First name",
      required: true,
      tooltip: {
        fr: "Votre prénom tel qu'il apparaîtra sur votre profil.",
        en: "Your first name as it will appear on your profile.",
      },
    },
    {
      name: "surname",
      type: "text",
      fr: "Nom",
      en: "Last name",
      required: true,
      tooltip: {
        fr: "Votre nom de famille.",
        en: "Your family name.",
      },
    },
    {
      name: "nickname",
      type: "text",
      fr: "Pseudo (optionnel)",
      en: "Nickname (optional)",
      required: false,
      tooltip: {
        fr: "Un surnom que les autres utilisateurs verront à la place de votre vrai nom.",
        en: "A username that other users will see instead of your real name.",
      },
    },
    {
      name: "email",
      type: "email",
      fr: "Email",
      en: "Email",
      required: true,
      tooltip: {
        fr: "Votre adresse email. Elle sera utilisée pour vous connecter et recevoir des notifications.",
        en: "Your email address. It will be used to log in and receive notifications.",
      },
    },
    {
      name: "city",
      type: "text",
      fr: "Ville (optionnel)",
      en: "City (optional)",
      required: false,
      tooltip: {
        fr: "Votre ville de résidence. Cette information est optionnelle.",
        en: "Your city of residence. This information is optional.",
      },
    },
    {
      name: "birthdate",
      type: "date",
      fr: "Date de naissance",
      en: "Birth date",
      required: true,
      tooltip: {
        fr: "Votre date de naissance. Vous devez avoir au moins 13 ans pour vous inscrire.",
        en: "Your date of birth. You must be at least 13 years old to register.",
      },
    },
    {
      name: "password",
      type: "password",
      fr: "Mot de passe",
      en: "Password",
      required: true,
      hint: {
        fr: "Minimum 8 caractères",
        en: "Minimum 8 characters",
      },
      tooltip: {
        fr: "Choisissez un mot de passe sécurisé d'au moins 8 caractères. Utilisez des lettres, chiffres et symboles.",
        en: "Choose a secure password of at least 8 characters. Use letters, numbers and symbols.",
      },
    },
    {
      name: "confirmPassword",
      type: "password",
      fr: "Confirmer le mot de passe",
      en: "Confirm password",
      required: true,
      tooltip: {
        fr: "Saisissez à nouveau votre mot de passe pour confirmer.",
        en: "Enter your password again to confirm.",
      },
    },
  ];

  const checkboxFields = [
    {
      name: "termsAccepted",
      required: true,
      fr: "J'accepte les",
      en: "I accept the",
      linkFr: "Conditions d'utilisation",
      linkEn: "Terms of Service",
      href: "/terms",
      tooltip: {
        fr: "Vous devez accepter nos conditions d'utilisation pour créer un compte. Cliquez sur le lien pour les lire.",
        en: "You must accept our terms of service to create an account. Click the link to read them.",
      },
    },
    {
      name: "privacyPolicyAccepted",
      required: true,
      fr: "J'accepte la",
      en: "I accept the",
      linkFr: "Politique de confidentialité",
      linkEn: "Privacy Policy",
      href: "/privacy",
      tooltip: {
        fr: "Vous devez accepter notre politique de confidentialité. Elle décrit comment nous utilisons vos données.",
        en: "You must accept our privacy policy. It describes how we use your data.",
      },
    },
    {
      name: "cookiesAccepted",
      required: false,
      fr: "J'accepte l'utilisation des",
      en: "I accept the use of",
      linkFr: "cookies",
      linkEn: "cookies",
      href: "/cookies",
      tooltip: {
        fr: "Les cookies nous permettent d'améliorer votre expérience sur le site.",
        en: "Cookies allow us to improve your experience on the site.",
      },
    },
    {
      name: "marketingConsent",
      required: false,
      fr: "J'accepte de recevoir des communications marketing",
      en: "I agree to receive marketing communications",
      linkFr: null,
      linkEn: null,
      href: null,
      tooltip: {
        fr: "Cochez cette case si vous souhaitez recevoir nos newsletters et offres promotionnelles.",
        en: "Check this box if you wish to receive our newsletters and promotional offers.",
      },
    },
  ];

  const ui = {
    fr: {
      title: "(Re)Sources Relationnelles",
      home: "Accueil",
      login: "Se connecter",
      subtitle: "Rejoignez une communauté bienveillante et sécurisée.",
      formTitle: "Créer un compte",
      submit: "S'inscrire",
      alreadyAccount: "Vous avez déjà un compte ?",
      loginLink: "Se connecter",
      cookieBannerTitle: "🍪 Nous utilisons des cookies",
      cookieBannerText: "Ce site utilise des cookies pour améliorer votre expérience. En continuant, vous acceptez notre politique de cookies.",
      cookieAccept: "Accepter",
      cookieReject: "Refuser",
      required: "Champ obligatoire",
      captchaError: "Veuillez valider le CAPTCHA",
      successMsg: "Compte créé avec succès !",
      serverError: "Erreur de connexion au serveur",
      invalidEmail: "Email invalide",
      passwordShort: "Minimum 8 caractères",
      passwordMismatch: "Les mots de passe ne correspondent pas",
      invalidDate: "La date doit être dans le passé",
      mustAcceptTerms: "Vous devez accepter les conditions",
      mustAcceptPrivacy: "Vous devez accepter la politique de confidentialité",
    },
    en: {
      title: "(Re)Sources Relationnelles",
      home: "Home",
      login: "Log in",
      subtitle: "Join a safe and respectful community.",
      formTitle: "Create an account",
      submit: "Sign up",
      alreadyAccount: "Already have an account?",
      loginLink: "Log in",
      cookieBannerTitle: "🍪 We use cookies",
      cookieBannerText: "This site uses cookies to improve your experience. By continuing, you accept our cookie policy.",
      cookieAccept: "Accept",
      cookieReject: "Decline",
      required: "Required field",
      captchaError: "Please validate the CAPTCHA",
      successMsg: "Account created successfully!",
      serverError: "Server connection error",
      invalidEmail: "Invalid email",
      passwordShort: "Minimum 8 characters",
      passwordMismatch: "Passwords do not match",
      invalidDate: "Date must be in the past",
      mustAcceptTerms: "You must accept the terms",
      mustAcceptPrivacy: "You must accept the privacy policy",
    },
  };

  const t = ui[language];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = t.required;
    if (!formData.surname.trim()) newErrors.surname = t.required;
    if (!formData.email.trim()) newErrors.email = t.required;
    if (!formData.birthdate) newErrors.birthdate = t.required;
    if (!formData.password) newErrors.password = t.required;
    if (!formData.confirmPassword) newErrors.confirmPassword = t.required;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) newErrors.email = t.invalidEmail;

    if (formData.password && formData.password.length < 8) newErrors.password = t.passwordShort;
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = t.passwordMismatch;

    if (formData.birthdate && new Date(formData.birthdate) >= new Date()) newErrors.birthdate = t.invalidDate;

    if (!formData.termsAccepted) newErrors.termsAccepted = t.mustAcceptTerms;
    if (!formData.privacyPolicyAccepted) newErrors.privacyPolicyAccepted = t.mustAcceptPrivacy;

    if (!captchaToken) newErrors.captcha = t.captchaError;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          surname: formData.surname,
          nickname: formData.nickname || null,
          email: formData.email,
          city: formData.city || null,
          birthdate: formData.birthdate,
          password: formData.password,
          termsAccepted: formData.termsAccepted,
          privacyPolicyAccepted: formData.privacyPolicyAccepted,
          cookiesAccepted: formData.cookiesAccepted,
          marketingConsent: formData.marketingConsent,
          captchaToken,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        alert(t.successMsg);
        window.location.href = "/login";
      } else {
        if (data.error) alert(data.error);
        else if (data.details) setErrors(data.details);
      }
    } catch {
      alert(t.serverError);
    } finally {
      setLoading(false);
    }
  };

  const handleCookieAccept = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setShowCookieBanner(false);
    setFormData({ ...formData, cookiesAccepted: true });
  };

  const handleCookieReject = () => {
    localStorage.setItem("cookiesAccepted", "false");
    setShowCookieBanner(false);
  };

  return (
    <div className="signup-page">
      {/* COOKIE BANNER */}
      {showCookieBanner && (
        <div className="cookie-banner">
          <div className="cookie-content">
            <h3>{t.cookieBannerTitle}</h3>
            <p>{t.cookieBannerText}</p>
            <div className="cookie-buttons">
              <button onClick={handleCookieAccept} className="btn-accept">{t.cookieAccept}</button>
              <button onClick={handleCookieReject} className="btn-reject">{t.cookieReject}</button>
            </div>
          </div>
        </div>
      )}

      {/* NAVBAR */}
      <header className="navbar">
        <div className="logo">{t.title}</div>
        <div className="nav-buttons">
          <a href="/">{t.home}</a>
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

      {/* CONTENT */}
      <div className="content">
        <div className="signup-hero">
          <h2>{t.formTitle}</h2>
          <p>{t.subtitle}</p>
        </div>

        <form className="signup-form" onSubmit={handleSubmit}>

          {/* CHAMPS TEXTE */}
          {fields.map((field) => (
            <div className="form-group" key={field.name}>
              <FieldLabel
                fr={field.fr}
                en={field.en}
                language={language}
                tooltip={field.tooltip}
              />
              <input
                type={field.type}
                name={field.name}
                placeholder={`${field.fr} / ${field.en}`}
                value={formData[field.name]}
                onChange={handleChange}
                className={errors[field.name] ? "error" : ""}
              />
              {field.hint && (
                <small>{language === "fr" ? field.hint.fr : field.hint.en}</small>
              )}
              {errors[field.name] && (
                <span className="error-text">{errors[field.name]}</span>
              )}
            </div>
          ))}

          {/* CHECKBOXES RGPD */}
          {checkboxFields.map((field) => (
            <div className="form-group checkbox-group" key={field.name}>
              <label className={errors[field.name] ? "error" : ""}>
                <input
                  type="checkbox"
                  name={field.name}
                  checked={formData[field.name]}
                  onChange={handleChange}
                />
                <span>
                  {language === "fr" ? field.fr : field.en}
                  {field.href && (
                    <>
                      {" "}
                      <a href={field.href} target="_blank" rel="noreferrer">
                        {language === "fr" ? field.linkFr : field.linkEn}
                      </a>
                    </>
                  )}
                  {field.required && " *"}
                </span>
                <Tooltip text={language === "fr" ? field.tooltip.fr : field.tooltip.en} />
              </label>
              {errors[field.name] && (
                <span className="error-text">{errors[field.name]}</span>
              )}
            </div>
          ))}

          {/* reCAPTCHA */}
          <div className="form-group captcha-group">
            <ReCAPTCHA
              sitekey="YOUR_RECAPTCHA_SITE_KEY_HERE"
              onChange={(token) => setCaptchaToken(token)}
              onExpired={() => setCaptchaToken(null)}
            />
            {errors.captcha && <span className="error-text">{errors.captcha}</span>}
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "..." : t.submit}
          </button>
        </form>

        <div className="login-link">
          <p>
            {t.alreadyAccount} <a href="/login">{t.loginLink}</a>
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
