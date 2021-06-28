const jwt = require('jsonwebtoken');
const { database } = require('../infrastructure');

async function validateAuthorization(req, res, next) {
    try {
        const { authorization } = req.headers;

        if (!authorization || !authorization.startsWith('Bearer ')) {
            const error = new Error('Authorization header required');
            error.code = 401;
            throw error;
        }

        const token = authorization.slice(7, authorization.length);//Corta el 'Bearer ' y se queda con el token de la auth.
        const decodedToken = jwt.verify(token, process.env.SECRET);//Verificamos que el token coincida con nuestro Secret del .env

        // Comprobamos que el usuario para el que fue emitido el token todavía existe.
        const query = 'SELECT * FROM users WHERE id_user = ?';
        const [users] = await database.pool.query(query, decodedToken.id);//decodedToken esta formado por el body que es devuelto en Login 

        if (!users || !users.length) {
            const error = new Error('El usuario ya no existe');
            error.code = 401;
            throw error;
        }

        req.auth = decodedToken;// meto la authorization en la request para usarla mas adelante. 
        next();// como dijimos es un middleware.
    } catch (err) {
        next(err);//Aqui actua como middleware que lleva al error final en server.js y explota todo
    }
}

module.exports = {
    validateAuthorization,
};
