const { database } = require('../infrastructure/index');

async function findTag(tag_name) {
    const [
        tag,
    ] = await database.pool.query(`SELECT * FROM tags WHERE tag_name=?`, [
        tag_name,
    ]);
    return tag[0];
}

async function createTag(tag_name) {
    const [
        result,
    ] = await database.pool.query(`INSERT INTO tags(tag_name) VALUES(?)`, [
        tag_name,
    ]);
    return result.insertId;
}
async function findTagsByUserId(id) {
    const query = `
    SELECT tags.tag_name
    FROM tags
    INNER JOIN question_tags ON tags.id_tag = question_tags.id_tag
    INNER JOIN questions ON questions.id_question = question_tags.id_question
    WHERE questions.id_user=?
    `;
    const [tags] = await database.pool.query(query, [id]);
    const tagsArray = tags.map((t) => t.tag_name);
    return tagsArray;
}

async function findTagsForChartByUserId(id_user) {
    const query = `
    select tag_name, count(*) as incidencia,
    (COUNT(*)/(select count('incidencia') from tags inner join question_tags on tags.id_tag = question_tags.id_tag
    inner join questions on questions.id_question = question_tags.id_question
    where questions.id_user=?)) * 100 as 'porcentaje'
    from tags
    inner join question_tags on tags.id_tag = question_tags.id_tag
    inner join questions on questions.id_question = question_tags.id_question
    where questions.id_user=?
    group by tags.tag_name order by incidencia desc;`;
    const [tags] = await database.pool.query(query, [id_user, id_user]);
    return tags;
}
async function findTagsByIncidence() {
    const query = `select tag_name, count(*) as incidencia from tags
    inner join question_tags on tags.id_tag = question_tags.id_tag
    group by tags.id_tag order by incidencia desc`;
    const [tags] = await database.pool.query(query);
    return tags;
}

module.exports = {
    findTag,
    createTag,
    findTagsByUserId,
    findTagsForChartByUserId,
    findTagsByIncidence,
};
