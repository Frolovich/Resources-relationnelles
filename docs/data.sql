CREATE DATABASE social_db;

CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  surname VARCHAR(100), 
  email VARCHAR(255) UNIQUE,
  password TEXT,
  date_registre DATETIME DEFAULT CURRENT_TIMESTAMP,
  statu BOOLEAN DEFAULT TRUE, 
  role ENUM('citizen','moderator','admin','superadmin') DEFAULT 'citizen',
  deleted_at DATETIME NULL
);

CREATE TABLE resources (
  id INT AUTO_INCREMENT PRIMARY KEY,
  popular INT AUTO_INCREMENT,
  favori INT  AUTO_INCREMENT,
  save INT  AUTO_INCREMENT,
  user_id INT,
  category_id INT,

  favorites BOOLEAN DEFAULT FALSE,
  description TEXT,
  content TEXT,
  

  type ENUM('video','music','photo','paid','game'),
  status ENUM('pending','approved','rejected') DEFAULT 'pending',

  date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
  date_publication DATETIME NULL,
  deleted_at DATETIME NULL,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (category_id) REFERENCES categories(id)
);


CREATE TABLE comments (
  user_id INT,
  statut ENUM('pending','approved','rejected') DEFAULT 'pending',
  date DATETIME NULL,
  content TEXT,

  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE categories (
  category_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  resource_id INT,

  FOREIGN KEY (resource_id) REFERENCES recources(id)
);

CREATE TABLE statistiques (
  statistiques_id INT AUTO_INCREMENT,
  date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
  favorites
  user_id INT,
  resource_id INT
);



CREATE TABLE favorites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  resource_id INT
);