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

    INSERT INTO questions (title, body, id_user) VALUES ('Lorem ipsum dolor sit amet consectetur', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 3);
    INSERT INTO questions (title, body, id_user) VALUES ('Consectetur Lorem ipsum dolor sit amet', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 1);
    INSERT INTO questions (title, body, id_user) VALUES ('Cómo convertir un un array de strings en un único string?', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 4);
    INSERT INTO questions (title, body, id_user) VALUES ('Métodos con arrays mas utilizados', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 3);
    INSERT INTO questions (title, body, id_user) VALUES ('Cómo aplicar sombras a bordes en Css?', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 1);
    INSERT INTO questions (title, body, id_user) VALUES ('Seleccionar la cantidad de cada valor en mysql', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 2);
    INSERT INTO questions (title, body, id_user) VALUES ('React como cargar imagen con ruta guardada con nanoid en mysql', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 5);
    INSERT INTO questions (title, body, id_user) VALUES ('¿Cuántas generaciones de lenguaje de programación existen?', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 4);
    INSERT INTO questions (title, body, id_user) VALUES ('¿A qué le llamamos pseudocódigo?', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 5);
    INSERT INTO questions (title, body, id_user) VALUES ('¿Qué es la codificación?', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 3);
    INSERT INTO questions (title, body, id_user) VALUES ('¿Cuáles son los lenguajes de programación más comunes?', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 2);
    INSERT INTO questions (title, body, id_user) VALUES ('¿Qué es compilar?', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 1);
    INSERT INTO questions (title, body, id_user) VALUES ('Cómo recorrer un Array con map?', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 4);
    INSERT INTO questions (title, body, id_user) VALUES ('Crear un array de objetos', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 2);
    INSERT INTO questions (title, body, id_user) VALUES ('¿Cómo convertir entre tuplas y listas?', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 1);
    INSERT INTO questions (title, body, id_user) VALUES ('¿Existe un depurador a nivel de código fuente con puntos de interrupción, depuración paso a paso, etc?', 'Mus nam facilisis ridiculus sociosqu fringilla curae accumsan, senectus ante etiam egestas dictum mauris, cum laoreet lectus luctus justo felis. Luctus imperdiet proin dictumst est mattis integer suscipit, aliquam porttitor felis nostra conubia praesent eget, tristique magna viverra posuere vulputate curae. Nullam nisi ornare viverra mus libero nunc ultrices tincidunt urna sociosqu', 1);
     

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

    




----retorna porcentaje de tags por incidencia de un usuario----
select tag_name, count(*) as incidencia,
(COUNT(*)/(select count('incidencia') from tags inner join question_tags on tags.id_tag = question_tags.id_tag
inner join questions on questions.id_question = question_tags.id_question
inner join users on users.id_user = questions.id_user
where questions.id_user=1)) * 100 as 'porcentaje'
from tags
inner join question_tags on tags.id_tag = question_tags.id_tag
inner join questions on questions.id_question = question_tags.id_question
inner join users on users.id_user = questions.id_user
where questions.id_user=1
group by tags.tag_name order by incidencia desc;
+----------+------------+------------+
| tag_name | incidencia | porcentaje |
+----------+------------+------------+
| java     |          1 |     8.3333 |
| php      |          1 |     8.3333 |
| hhh      |          1 |     8.3333 |
| ttt      |          1 |     8.3333 |
| s        |          1 |     8.3333 |
| w        |          1 |     8.3333 |
| a        |          1 |     8.3333 |
| g        |          1 |     8.3333 |
| u        |          1 |     8.3333 |
| p        |          1 |     8.3333 |
| e        |          1 |     8.3333 |
| y        |          1 |     8.3333 |
+----------+------------+------------+


---Devuelve los tags con su total de incidencias en orden descendente---
select tag_name, count(*) as incidencia from tags
 inner join question_tags on tags.id_tag = question_tags.id_tag
 group by tags.id_tag order by incidencia desc;
+----------+------------+
| tag_name | incidencia |
+----------+------------+
| php      |          3 |
| java     |          2 |
| linkedin |          1 |
+----------+------------+




----query que retorna la cantaidad de votos qye tiene una pregunta------
mysql> select count(*) as votes from questions_points where id_question = 20;
+-------+
| votes |
+-------+
|     3 |
+-------+

-----------retorna cada id con su cantidad de votos ordenada de mas votada a menos ----------------
mysql> SELECT id_question, count(*) AS votes FROM questions_points GROUP BY id_question ORDER BY votes DESC LIMIT 20;
+-------------+-------+
| id_question | votes |
+-------------+-------+
|          20 |     3 |
|           4 |     1 |
|          15 |     1 |
+-------------+-------+

----cuenta la cantidad de preguntas hechas por un usuario---
select count(*) as incidencia from questions  
where id_user = 1;
+------------+
| incidencia |
+------------+
|         18 |
+------------+
---multiplica la cantidad de preguntas de un usuario por 15 
select count(*) * 15 as total_preg from questions where id_user = 1;
+------------+
| total_preg |
+------------+
|        270 |
+------------+


----multiplica la cantidad de respyestas de un usuario por 10
select count(*) * 10 as total_resp from answers 
where id_user = 1 and id_answer_father is null;
+------------+
| total_resp |
+------------+
|        120 |
+------------+


---multiplica la cantidad de comentarios de un usuario por 5
select count(*) * 5 as total_coment from answers where id_user = 1 and id_answer_father is not null;
+--------------+
| total_coment |
+--------------+
|           10 |
+--------------+

---total de puntos de usuario obtenidos por la cantidad de votos que han recibido sus preguntas mult por 7---
SELECT COUNT(*) * 7 AS votos_preg FROM questions_points 
inner join questions ON questions.id_question = questions_points.id_question 
where questions.id_user = 1;
+------------+
| votos_preg |
+------------+
|         14 |
+------------+

---total de puntos de usuario obtenidos por la cantidad de votos que hayan recibido sus respuestas mult por 5---
SELECT COUNT(*) * 5 AS votos_resp FROM answers_points 
inner join answers ON answers.id_answer = answers_points.id_answer 
where answers.id_user = 1 and answers.id_answer_father is null;
+------------+
| votos_resp |
+------------+
|         35 |
+------------+

---total de puntos de usuario obtenidos por la cantidad de votos que hayan recibido sus comentarios mult por 5---
SELECT COUNT(*) * 3 AS votos_comm FROM answers_points 
inner join answers ON answers.id_answer = answers_points.id_answer 
where answers.id_user = 1 and answers.id_answer_father is not null;
+------------+
| votos_comm |
+------------+
|          6 |
+------------+

----total de puntos de usuario por respuestas que hayan sido aceptadas-----
select count(*) * 20 as puntos_x_resp_aceptadas from questions 
inner join answers on answers.id_answer = questions.id_answer_acepted 
where answers.id_user = 1;
+----------------------------+
| puntos_x_resp_aceptadas |
+----------------------------+
|                         60 |
+----------------------------+

zeto deberia tener 515 puntos.-


SELECT SUM(puntos) user_points
    FROM (    
        select count(*) * 15 as puntos from questions where id_user = 1
    
        UNION
    
        select count(*) * 10 as puntos from answers 
        where id_user = 1 and id_answer_father is null
    
        UNION
    
        select count(*) * 5 as puntos from answers where id_user = 1 and id_answer_father is not null
    
        UNION
    
        SELECT COUNT(*) * 7 AS puntos FROM questions_points 
        inner join questions ON questions.id_question = questions_points.id_question 
        where questions.id_user = 1
    
        UNION
    
        SELECT COUNT(*) * 5 AS puntos FROM answers_points 
        inner join answers ON answers.id_answer = answers_points.id_answer 
        where answers.id_user = 1 and answers.id_answer_father is null    
    
        UNION
    
        SELECT COUNT(*) * 3 AS puntos FROM answers_points 
        inner join answers ON answers.id_answer = answers_points.id_answer 
        where answers.id_user = 1 and answers.id_answer_father is not null
    
        UNION
    
        select count(*) * 20 as puntos from questions 
        inner join answers on answers.id_answer = questions.id_answer_acepted 
        where answers.id_user = 1
    
    )user_points;
+-------------+
| user_points |
+-------------+
|         810 |
+-------------+

------------------------------------------------------------------------------------
UPDATE users SET rol = "expert"
  WHERE (SELECT SUM(puntos) user_points
    FROM (    
        select count(*) * 15 as puntos from questions where id_user = 6
    
        UNION
    
        select count(*) * 10 as puntos from answers where id_user = 6 and id_answer_father is null
    
        UNION
    
        select count(*) * 5 as puntos from answers where id_user = 6 and id_answer_father is not null
    
        UNION
    
        SELECT COUNT(*) * 7 AS puntos FROM questions_points 
        inner join questions ON questions.id_question = questions_points.id_question 
        where questions.id_user = 6
    
        UNION
    
        SELECT COUNT(*) * 5 AS puntos FROM answers_points 
        inner join answers ON answers.id_answer = answers_points.id_answer 
        where answers.id_user = 6 and answers.id_answer_father is null    
    
        UNION
    
        SELECT COUNT(*) * 3 AS puntos FROM answers_points 
        inner join answers ON answers.id_answer = answers_points.id_answer 
        where answers.id_user = 6 and answers.id_answer_father is not null
    
        UNION
    
        select count(*) * 20 as puntos from questions 
        inner join answers on answers.id_answer = questions.id_answer_acepted 
        where answers.id_user = 6)user_points)> 1500;


 
