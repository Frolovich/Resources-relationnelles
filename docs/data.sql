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

INSERT INTO users (name, surname, email, password)
VALUES ('Johny', 'Jein', 'jhony@mail.com', '123456');

CREATE TABLE resources (
  resource_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  category_id INT,

  popular INT AUTO_INCREMENT,
  favori INT  AUTO_INCREMENT,
  save INT  AUTO_INCREMENT,

  favorites BOOLEAN DEFAULT FALSE,
  description TEXT,
  content TEXT,
  

  type ENUM('video','photo','game'),
  status ENUM('pending','approved','rejected') DEFAULT 'pending',
  restreint BOOLEAN,
  date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
  date_publication DATETIME NULL,
  deleted_at DATETIME NULL,

  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (category_id) REFERENCES categories(category_id)
);


INSERT INTO resources (user_id, category_id, description, content, type)
VALUES (1, 1, 'My first video', 'video.mp4', 'video');


CREATE TABLE comments (
  user_id INT,
  statut ENUM('pending','approved','rejected') DEFAULT 'pending',
  date DATETIME NULL,
  content TEXT,

  FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO comments (user_id, resource_id, content)
VALUES (1, 1, 'Nice video!');
CREATE TABLE categories (

category_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  resource_id INT,

  FOREIGN KEY (resource_id) REFERENCES recources(resource_id)
);
INSERT INTO categories (name)
VALUES ('Video'), ('Photo');

CREATE TABLE statistiques (
  statistique_id INT AUTO_INCREMENT,
  resource_id INT,
  date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
  video_popular DEFAULT 0,
  photo popular DEFAULT 0,
  video_save DEFAULT 0,
  photo_save DEFAULT 0,
  video_favori DEFAULT 0, 
  photo_favori DEFAULT 0
  FOREIGN KEY (resource_id) REFERENCES recources(resource_id)
);

INSERT INTO statistiques (resource_id, views, favorites, saves)
VALUES (1, 10, 2, 1);