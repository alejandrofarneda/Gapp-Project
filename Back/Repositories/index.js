const userRepository = require('./users_repository');
const questionsRepository = require('./questions_respository');
const answersRepository = require('./answers_repository');
const commentsRepository = require('./comments_repository');
const scoresRepository = require('./scores_repository');
const tagsRepository = require('./tags_repository');

module.exports = {
    userRepository,
    questionsRepository,
    answersRepository,
    commentsRepository,
    scoresRepository,
    tagsRepository,
};
