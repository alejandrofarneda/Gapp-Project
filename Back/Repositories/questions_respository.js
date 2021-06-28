const { database } = require('../infrastructure/index');

async function findQuestionById(id) {
  const query = `
    SELECT * FROM questions WHERE id_question = ?`;
  const [question] = await database.pool.query(query, [id]);

  const tagsQuery = `
    SELECT tags.*
    FROM tags
    INNER JOIN question_tags ON tags.id_tag = question_tags.id_tag
    WHERE question_tags.id_question = ?
  `;

  const [tags] = await database.pool.query(tagsQuery, [
    question[0].id_question,
  ]);

  const q = {
    ...question[0],
    tags,
  };

  return q;
}

async function findQuestionsByTag(tag_name) {
  const query = `
   SELECT questions.id_question
    FROM questions 
    INNER JOIN question_tags ON question_tags.id_question = questions.id_question
    INNER JOIN tags ON question_tags.id_tag = tags.id_tag
    WHERE tags.tag_name IN (?);
  `;

  const [questions] = await database.pool.query(query, [tag_name]);

  // mira aquí:
  // https://flaviocopes.com/javascript-async-await-array-map/
  // https://advancedweb.hu/how-to-use-async-functions-with-array-map-in-javascript/
  return Promise.all(
    questions.map(async (question) => {
      return await findQuestionById(question.id_question);
    })
  );
}
async function findQuestionByTitle(title) {
  const [questions] = await database.pool.query(`
  SELECT id_question
  FROM questions
  WHERE title REGEXP ('${title}')
  `);
  return Promise.all(
    questions.map(async (question) => {
      return await findQuestionById(question.id_question);
    })
  );
}

async function addQuestion(title, body, id_user) {
  const query = 'INSERT INTO questions (title, body, id_user) VALUES (?, ?, ?)';
  const [DanielSan] = await database.pool.query(query, [title, body, id_user]);

  return findQuestionById(DanielSan.insertId);
}

async function addTagToQuestion(id_question, id_tag) {
  const [
    existing,
  ] = await database.pool.query(
    `SELECT * from question_tags WHERE id_question=? AND id_tag=?`,
    [id_question, id_tag]
  );
  if (!existing.length) {
    await database.pool.query(
      `INSERT INTO question_tags(id_question, id_tag) VALUES(?,?)`,
      [id_question, id_tag]
    );
  }
}

async function findQuestionByUserId(id) {
  const query = 'SELECT * FROM questions WHERE id_user= ?';
  const [questions] = await database.pool.query(query, id);

  return Promise.all(
    questions.map(async (question) => {
      return await findQuestionById(question.id_question);
    })
  );
}

async function findUserByQuestionId(id) {
  const question = await findQuestionById(id);

  return question.id_user;
}

async function closeQuestion(id_question, id_answer) {
  const query = `UPDATE questions SET status_enum = ?, id_answer_acepted = ${id_answer} WHERE id_question = ${id_question}`;
  await database.pool.query(query, 'PREGUNTA CERRADA');
  return;
}

async function deleteQuestionById(id) {
  await database.pool.query(`DELETE FROM answers WHERE id_question = ${id}`);
  const query = 'DELETE FROM questions WHERE id_question = ?';
  await database.pool.query(query, id);

  return;
}
async function chiudiQuestionByAdmin(id_question) {
  const query = `UPDATE questions SET status_enum = ? WHERE id_question = ${id_question}`;
  await database.pool.query(query, 'PREGUNTA CERRADA');
  return;
}
async function findRandomQuestions() {
  const [questions] = await database.pool.query(
    'SELECT * FROM questions ORDER BY rand() LIMIT 20'
  );

  return Promise.all(
    questions.map(async (question) => {
      return await findQuestionById(question.id_question);
    })
  );
}
async function findLastQuestions() {
  const [questions] = await database.pool.query(
    'SELECT * FROM questions ORDER BY id_question DESC LIMIT 20'
  );

  return Promise.all(
    questions.map(async (question) => {
      return await findQuestionById(question.id_question);
    })
  );
}

async function findHotQuestions() {
  const [questions] = await database.pool.query(
    'SELECT id_question, count(*) AS votes FROM questions_points GROUP BY id_question ORDER BY votes DESC LIMIT 20'
  );
  return Promise.all(
    questions.map(async (question) => {
      return await findQuestionById(question.id_question);
    })
  );
}
async function findNotAnsweredQuestions() {
  const [questions] = await database.pool.query(
    'SELECT id_question FROM questions WHERE status_enum = "NO TIENE RESPUESTAS" or status_enum = "TIENE RESPUESTAS" ORDER BY creation_date DESC LIMIT 20'
  );
  return Promise.all(
    questions.map(async (question) => {
      return await findQuestionById(question.id_question);
    })
  );
}
async function findRandomQuestionLanding() {
  const query = 'SELECT * FROM questions ORDER BY rand() LIMIT 4';
  const [questions] = await database.pool.query(query);
  return questions;
}
module.exports = {
  findQuestionById,
  addQuestion,
  findQuestionByUserId,
  findUserByQuestionId,
  closeQuestion,
  deleteQuestionById,
  addTagToQuestion,
  findQuestionsByTag,
  findQuestionByTitle,
  chiudiQuestionByAdmin,
  findRandomQuestions,
  findLastQuestions,
  findHotQuestions,
  findNotAnsweredQuestions,
  findRandomQuestionLanding,
};
