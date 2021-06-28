const { database } = require('../infrastructure/index');

const findUserByEmail = async (email) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    const [users] = await database.pool.query(query, email);

    return users[0];
};

async function verifyUser(id_user) {
    await database.pool.query(
        `UPDATE users SET isVerify = 1 WHERE id_user = ${id_user}`
    );
    return;
}

async function createUser(data) {
    const query =
        'INSERT INTO users (name_user, email, color, password_user, verify_code) VALUES (?, ?, ?, ?, ?)';
    await database.pool.query(query, [
        data.name_user,
        data.email,
        data.color,
        data.password_user,
        data.activationCode,
    ]);

    return findUserByEmail(data.email);
}

async function findUserByValidationCode(validateCode) {
    const query = 'SELECT * FROM users WHERE verify_code=?';
    const [user] = await database.pool.query(query, validateCode);
    return user[0];
}

async function findUserById(id) {
    const query = 'SELECT * FROM users WHERE id_user = ?';
    const [user] = await database.pool.query(query, id);
    return user[0];
}

async function findUserByTag(tag_name) {
    const query = `
   SELECT users.id_user
    FROM users 
    INNER JOIN questions ON questions.id_user = users.id_user
    INNER JOIN question_tags ON question_tags.id_question = questions.id_question 
    INNER JOIN tags ON question_tags.id_tag = tags.id_tag
    WHERE tags.tag_name = ?; 
  `;

    const [users] = await database.pool.query(query, [tag_name]);

    // mira aquí:
    // https://flaviocopes.com/javascript-async-await-array-map/
    // https://advancedweb.hu/how-to-use-async-functions-with-array-map-in-javascript/
    return Promise.all(
        users.map(async (user) => {
            return await findUserById(user.id_user);
        })
    );
}
async function findUserByName(name_user) {
    const query = 'SELECT * FROM users WHERE name_user LIKE ?';
    const [user] = await database.pool.query(query, `%${name_user}%`);
    return user;
}

async function findUserByQuestionId(id_question) {
    const query =
        'SELECT * FROM users  INNER JOIN questions ON questions.id_user = users.id_user WHERE id_question = ?';
    const [user] = await database.pool.query(query, id_question);
    return user[0];
}

async function changeUserData(id, name_user, show_mail, descritpion) {
    const query = `UPDATE users SET name_user = ?, show_mail = ?, descritpion = ? WHERE id_user = ${id}`;
    await database.pool.query(query, [name_user, show_mail, descritpion]);
    const user = await findUserById(id);
    return user;
}

async function changeAvatar(id, avatar) {
    const query = 'UPDATE users SET foto = ? WHERE id_user = ?';
    await database.pool.query(query, [avatar, id]);
    return await findUserById(id);
}

async function deleteUserByid(id) {
    return await database.pool.query(`DELETE FROM users WHERE id_user = ${id}`);
}
async function findUserByRolRandom(rol) {
    const query = 'SELECT * FROM users WHERE rol = ? ORDER BY rand() LIMIT 2; ';
    const [user] = await database.pool.query(query, `${rol}`);
    return user;
}
async function findUserByRol(rol) {
    const query = 'SELECT * FROM users WHERE rol = ?';
    const [user] = await database.pool.query(query, `${rol}`);
    return user;
}

async function blockUserById(id_user) {
    const query = 'UPDATE users SET isVerify = 0 WHERE id_user = ?';
    await database.pool.query(query, [id_user]);
    return;
}

async function unBlockUserById(id_user) {
    const query = 'UPDATE users SET isVerify = 1 WHERE id_user = ?';
    await database.pool.query(query, [id_user]);
    return;
}

async function findVerifySituation(id_user) {
    const query = 'SELECT isVerify FROM users WHERE id_user = ?';
    const [isVerify] = await database.pool.query(query, id_user);
    return isVerify[0];
}

async function ascenderUsuarioAExperto(id_user) {
    const query = `UPDATE users SET rol = 'expert' WHERE id_user = ?`;
    await database.pool.query(query, id_user);
    return;
}

module.exports = {
    findUserByEmail,
    verifyUser,
    createUser,
    findUserById,
    findUserByTag,
    findUserByName,
    findUserByQuestionId,
    changeUserData,
    deleteUserByid,
    findUserByValidationCode,
    changeAvatar,
    findUserByRolRandom,
    findUserByRol,
    blockUserById,
    unBlockUserById,
    findVerifySituation,
    ascenderUsuarioAExperto,
};
