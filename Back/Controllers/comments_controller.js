const Joi = require('joi');

const { userRepository, commentsRepository } = require('../Repositories/index');

async function createComment(req, res, next) {
    try {
        const { id } = req.auth;
        const { id_answer_father } = req.params;
        const { body } = req.body;
        const id_question = await commentsRepository.findQuestionByAnswerId(
            id_answer_father
        );

        const schema = Joi.object({
            body: Joi.string().max(1000).required(),
        });
        await schema.validateAsync({ body });

        const comment = await commentsRepository.addComment(
            body,
            id_question,
            id,
            id_answer_father
        );

        const user = await userRepository.findUserById(id);

        res.status(201);
        res.send({
            body: comment[0].body,
            color: user.color,
            creation_date: comment[0].creation_date,
            foto: user.foto,
            id_answer: comment[0].id_answer,
            id_user: user.id_user,
            name_user: user.name_user,
            id_answer_father: comment[0].id_answer_father,
        });
    } catch (err) {
        next(err);
    }
}

async function getCommentsByAnswerFatherId(req, res, next) {
    try {
        const { id_answer_father } = req.params;

        const comments = await commentsRepository.findCommentsByAnswerFatherId(
            id_answer_father
        );
        res.send({
            comments,
        });
    } catch (err) {
        next(err);
    }
}

async function removeComment(req, res, next) {
    try {
        const { id, rol } = req.auth;
        const { id_comment } = req.params;
        const userId = await userRepository.findUserById(id);
        if (userId.id_user !== id && rol !== 'admin') {
            const error = new Error('Acceso denegado');
            error.code = 401;
            throw error;
        }
        await commentsRepository.deleteComment(id_comment);
        res.status(201);
        res.send(`El comentario con id ${id_comment} ha sido eliminado.`);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createComment,
    getCommentsByAnswerFatherId,
    removeComment,
};
