DROP DATABASE IF EXISTS gap;

CREATE DATABASE gap;

USE gap;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS questions;
DROP TABLE IF EXISTS answers;
DROP TABLE IF EXISTS tags;
DROP TABLE IF EXISTS question_tags;
DROP TABLE IF EXISTS questions_points;
DROP TABLE IF EXISTS answers_points;
DROP TABLE IF EXISTS comments_points;

CREATE TABLE users (
	id_user INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name_user VARCHAR(255) NOT NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    password_user VARCHAR(255) NOT NULL,
    reg_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, 
    foto VARCHAR(100),
    color VARCHAR(20),
    show_mail BOOLEAN DEFAULT 0,
    isVerify BOOLEAN DEFAULT 0,
    verify_code VARCHAR(20),
    descritpion VARCHAR(1000),
    sum INT DEFAULT 0,
    rol VARCHAR(10) DEFAULT "user"    
    );
   
    INSERT INTO users (name_user, email, color, password_user, isVerify, descritpion, rol) VALUES('Zé Tó', 'zeto@gmail.com', 'rgb(22,88,27)', '$2a$10$wS/M8rBJl6T9dPJLUBvbYOFSwL3rbShzbEjx0BAaTdRflJpLcE0bm', 1, 'The Boss', 'admin');
    INSERT INTO users (name_user, email, color, password_user, isVerify, descritpion, rol) VALUES('The Dude', 'thedude@gmail.com', 'rgb(221,188,27)', '$2a$10$wS/M8rBJl6T9dPJLUBvbYOFSwL3rbShzbEjx0BAaTdRflJpLcE0bm', 1, 'El duderino', 'expert');
    INSERT INTO users (name_user, email, color, password_user, isVerify, descritpion, rol) VALUES('Lone Ranger', 'loneranger@gmail.com', 'rgb(222,88,227)', '$2a$10$wS/M8rBJl6T9dPJLUBvbYOFSwL3rbShzbEjx0BAaTdRflJpLcE0bm', 1, 'Hi ho Silver!', 'expert');
    INSERT INTO users (name_user, email, color, password_user, isVerify, descritpion, rol) VALUES('Han Acompañado', 'accompanied@gmail.com', 'rgb(22,188,227)', '$2a$10$wS/M8rBJl6T9dPJLUBvbYOFSwL3rbShzbEjx0BAaTdRflJpLcE0bm', 1, 'Nunca solo, siempre acompañado', 'user');
    INSERT INTO users (name_user, email, color, password_user, isVerify, descritpion, rol) VALUES('Beatrix Kiddo', 'beakiddo@gmail.com',  'rgb(32,18,157)','$2a$10$wS/M8rBJl6T9dPJLUBvbYOFSwL3rbShzbEjx0BAaTdRflJpLcE0bm', 1, 'It is mercy, compassion and forgiveness I lack. Not rationality.', 'expert');
    INSERT INTO users (name_user, email, color, password_user, isVerify, descritpion, rol) VALUES('Juno MacGuff', 'juno@gmail.com', 'rgb(222,25,57)', '$2a$10$wS/M8rBJl6T9dPJLUBvbYOFSwL3rbShzbEjx0BAaTdRflJpLcE0bm', 1, 'I do not know what kind of girl I am', 'user');
    INSERT INTO users (name_user, email, color, password_user, isVerify, descritpion, rol) VALUES('Mia Wallace', 'themia@gmail.com', 'rgb(122,48,27)', '$2a$10$wS/M8rBJl6T9dPJLUBvbYOFSwL3rbShzbEjx0BAaTdRflJpLcE0bm', 1, 'Why do we feel it is necessary to yak about bullshit in order to be comfortable?', 'expert');
    INSERT INTO users (name_user, email, color, password_user, isVerify, descritpion, rol) VALUES('Jules Winnfield', 'julesw@gmail.com', 'rgb(112,45,11)', '$2a$10$wS/M8rBJl6T9dPJLUBvbYOFSwL3rbShzbEjx0BAaTdRflJpLcE0bm', 1, 'The path of the righteous man is beset on all sides by the inequities of the selfish and the tyranny of evil men.', 'user');
    INSERT INTO users (name_user, email, color, password_user, isVerify, descritpion, rol) VALUES('Walter Sobchak', 'wsob@gmail.com', 'rgb(155,99,27)', '$2a$10$wS/M8rBJl6T9dPJLUBvbYOFSwL3rbShzbEjx0BAaTdRflJpLcE0bm', 1, 'This Is Not ‘Nam. This Is Bowling. There Are Rules.', 'user');
    INSERT INTO users (name_user, email, color, password_user, isVerify, descritpion, rol) VALUES('Zare Destanov', 'zared@gmail.com', 'rgb(200,95,25)', '$2a$10$wS/M8rBJl6T9dPJLUBvbYOFSwL3rbShzbEjx0BAaTdRflJpLcE0bm', 1, 'Pitbull terrier', 'user');
    INSERT INTO users (name_user, email, color, password_user, isVerify, descritpion, rol) VALUES('Joy Jordan', 'jjordan@gmail.com', 'rgb(100,11,99)', '$2a$10$wS/M8rBJl6T9dPJLUBvbYOFSwL3rbShzbEjx0BAaTdRflJpLcE0bm', 1, 'Dont you miss Russia?', 'user');
   
   
   
   CREATE TABLE questions (
	id_question INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(250) NOT NULL,
    body VARCHAR(2500) NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,    
    id_user INT NOT NULL,
    status_enum ENUM('NO TIENE RESPUESTAS', 'TIENE RESPUESTAS', 'PREGUNTA CERRADA') NOT NULL,    
    id_answer_acepted INT,
    FOREIGN KEY (id_user) REFERENCES users(id_user)
    );

    INSERT INTO questions (title, body, id_user) VALUES ('Lorem ipsum dolor sit amet consectetur', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 1);
    INSERT INTO questions (title, body, id_user) VALUES ('Consectetur Lorem ipsum dolor sit amet', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 1);
    INSERT INTO questions (title, body, id_user) VALUES ('Consectetur Lorem ipsum dolor sit amet', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 1);
    INSERT INTO questions (title, body, id_user) VALUES ('Lorem ipsum dolor sit amet consectetur', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 1);
    INSERT INTO questions (title, body, id_user) VALUES ('Lorem ipsum dolor sit amet consectetur', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 1);
    INSERT INTO questions (title, body, id_user) VALUES ('Lorem ipsum dolor sit amet consectetur', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 1);
    INSERT INTO questions (title, body, id_user) VALUES ('Lorem ipsum dolor sit amet consectetur', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 1);
    INSERT INTO questions (title, body, id_user) VALUES ('Lorem ipsum dolor sit amet consectetur', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 1);
    INSERT INTO questions (title, body, id_user) VALUES ('Lorem ipsum dolor sit amet consectetur', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 1);
    INSERT INTO questions (title, body, id_user) VALUES ('Lorem ipsum dolor sit amet consectetur', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 1);
    INSERT INTO questions (title, body, id_user) VALUES ('Lorem ipsum dolor sit amet consectetur', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 1);
    INSERT INTO questions (title, body, id_user) VALUES ('Lorem ipsum dolor sit amet consectetur', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 1);
    INSERT INTO questions (title, body, id_user) VALUES ('Lorem ipsum dolor sit amet consectetur', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 1);
    INSERT INTO questions (title, body, id_user) VALUES ('Lorem ipsum dolor sit amet consectetur', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 1);
    INSERT INTO questions (title, body, id_user) VALUES ('Lorem ipsum dolor sit amet consectetur', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 1);
    INSERT INTO questions (title, body, id_user) VALUES ('Lorem ipsum dolor sit amet consectetur', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 1);
    INSERT INTO questions (title, body, id_user) VALUES ('Lorem ipsum dolor sit amet consectetur', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 1);
    
	CREATE TABLE answers (
	id_answer INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    body VARCHAR(1500) NOT NULL,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,  
    id_question INT NOT NULL,
    id_user INT NOT NULL,
    id_answer_father INT,    
    FOREIGN KEY (id_question) REFERENCES questions(id_question),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
    );
    
    

    CREATE TABLE tags (
	id_tag INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tag_name VARCHAR(20) UNIQUE NOT NULL
    );
    
	CREATE TABLE question_tags (
	id_question INT NOT NULL,
    id_tag INT NOT NULL,
    CONSTRAINT fk_q_t_question FOREIGN KEY (id_question) REFERENCES questions(id_question),
    CONSTRAINT fk_p_p_tag FOREIGN KEY (id_tag) REFERENCES tags(id_tag)
	);
   
    
    CREATE TABLE questions_points (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        id_question INT,
        id_user INT,
        id_question_user INT,
        FOREIGN KEY (id_question) REFERENCES questions(id_question),
        FOREIGN KEY (id_user) REFERENCES users(id_user),
        FOREIGN KEY (id_question_user) REFERENCES users(id_user)       
        
    );

    CREATE TABLE answers_points (
        id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
        id_answer INT,
        id_user INT,
        id_answer_user INT,
        FOREIGN KEY (id_answer) REFERENCES answers(id_answer),
        FOREIGN KEY (id_user) REFERENCES users(id_user),
        FOREIGN KEY (id_answer_user) REFERENCES users(id_user)
              
    );