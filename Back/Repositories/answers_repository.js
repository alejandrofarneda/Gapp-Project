const { database } = require('../infrastructure/index');
const { findQuestionById } = require('./questions_respository');

async function findAnswerById(id) {
    const query = 'SELECT * FROM answers WHERE id_answer = ?';
    const [answer] = await database.pool.query(query, [id]);

    return answer;
}
async function findAnswersByQuestionId(id_question) {
    const query =
        'SELECT users.name_user, users.foto, users.color, users.id_user, id_answer, creation_date, body, id_answer_father FROM users, answers WHERE answers.id_question = ? AND users.id_user = answers.id_user AND answers.id_answer_father IS NULL';
    const [answers] = await database.pool.query(query, [id_question]);
    return answers;
}
async function findAnswerByUserId(id) {
    const query = 'SELECT * FROM answers WHERE id_user= ?';
    const [answers] = await database.pool.query(query, id);

    return Promise.all(
        answers.map(async (answer) => {
            return await findQuestionById(answer.id_question);
        })
    );
}

async function addAnswer(body, id_user, id_question) {
    const query2 = `UPDATE questions SET status_enum = ? WHERE id_question = ?`;
    await database.pool.query(query2, ['TIENE RESPUESTAS', id_question]);
    const query =
        'INSERT INTO answers (body, id_user, id_question) VALUES (?, ?, ?)';
    const [result] = await database.pool.query(query, [
        body,
        id_user,
        id_question,
    ]);
    const answer = await findAnswerById(result.insertId);
    return answer;
}

async function findUserByAnswerId(id_answer) {
    const [answer] = await findAnswerById(id_answer);
    return answer.id_user;
}

async function deleteAnswer(id_answer) {
    const query = 'DELETE FROM answers WHERE id_answer = ?';
    await database.pool.query(query, id_answer);
    return;
}

module.exports = {
    addAnswer,
    findAnswerById,
    findAnswerByUserId,
    findAnswersByQuestionId,
    findUserByAnswerId,
    deleteAnswer,
};

//Necesitamos body_answer / creation_date_answer / username_user/ => id_question
// SELECT body, creation_date, name
// FROM answers, users
// WHERE answers.id_user =
