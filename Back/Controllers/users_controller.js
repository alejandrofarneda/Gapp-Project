const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
    sendMail,
    saveAvatar,
    deleteAvatar,
    random_bg_color,
} = require('../helpers');

const { nanoid } = require('nanoid');

const userRepository = require('../Repositories/users_repository');
const { tagsRepository } = require('../Repositories');

async function register(req, res, next) {
    try {
        const { name_user, email, password_user, repeatedPassword } = req.body;

        const schema = Joi.object({
            name_user: Joi.string(),
            email: Joi.string().email().required(),
            password_user: Joi.string().min(5).max(20).required(),
            repeatedPassword: Joi.string().min(5).max(20).required(),
        });

        await schema.validateAsync({
            name_user,
            email,
            password_user,
            repeatedPassword,
        });

        if (password_user !== repeatedPassword) {
            const err = new Error(
                'Password y repeatedPassword deben coincidir'
            );
            err.httpCode = 400;
            throw err;
        }

        const user = await userRepository.findUserByEmail(email);

        if (user) {
            const err = new Error(`Ya existe un usuario con email: ${email}`);
            err.httpCode = 409;

            throw err;
        }

        const passwordHash = await bcrypt.hash(password_user, 10);
        const activationCode = nanoid(20);
        const color = random_bg_color().toString();

        const createdUser = await userRepository.createUser({
            name_user,
            email,
            color,
            password_user: passwordHash,
            activationCode,
        });

        await sendMail({
            to: email,
            subject: 'Confirma tu correo',
            message: `Gracias por registrarte en GAPP!
            Pulsa el siguiente enlace para activar tu usuario:
            ${process.env.HOSTNAME}/verify/${activationCode}
            `,
        });
        res.status(201);
        res.send({
            id: createdUser.id_user,
            name: createdUser.name_user,
            email: createdUser.email,
            password: createdUser.password_user,
        });
    } catch (err) {
        next(err);
    }
}

async function addAvatar(req, res, next) {
    try {
        if (!req.files || !req.files.avatar) {
            const error = new Error('Es necesario subir un fichero');
            error.httpCode = 400;
            throw error;
        }

        const { id } = req.auth;

        const { avatar } = req.files;

        const user = await userRepository.findUserById(id);

        if (user.foto) {
            await deleteAvatar({ file: user.foto });
        }

        const fileName = await saveAvatar({ file: avatar });

        const updatedUser = await userRepository.changeAvatar(id, fileName);

        res.send({
            user: updatedUser,
        });
    } catch (err) {
        next(err);
    }
}

async function validateUser(req, res, next) {
    try {
        const { validateCode } = req.params;

        const user = await userRepository.findUserByValidationCode(
            validateCode
        );

        if (validateCode !== user.verify_code) {
            const error = new Error('VerifyCode no Coincide');
            error.code = 401;

            throw error;
        }
        await userRepository.verifyUser(user.id_user);

        res.status(201);
        res.send({
            message: `Usuario ${user.name_user} verificado`,
        });
    } catch (err) {
        next(err);
    }
}

async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const schema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(5).max(20).required(),
        });
        await schema.validateAsync({ email, password });

        const user = await userRepository.findUserByEmail(email);

        if (!user) {
            const error = new Error('El usuario no existe');
            error.code = 401;
            throw error;
        }
        if (!user.isVerify) {
            const error = new Error('El usuario no está validado');
            error.code = 401;
            throw error;
        }
        //comparo la password con la que tengo guardada en la tabla (son hashs).
        const isValidPass = await bcrypt.compare(password, user.password_user);

        if (!isValidPass) {
            const error = new Error('El password no es válido');
            error.code = 401;

            throw error;
        }
        //Construir el jwt (json web tokens):
        const tokenPayLoad = { id: user.id_user, rol: user.rol }; //voy a tomar el id del usuario y el rol que vienen implicito en user

        //Generamos el token a partir del user.id: estos son los 3 argumentos de la funcion "jwt.sign()"
        const token = jwt.sign(tokenPayLoad, process.env.SECRET, {
            expiresIn: '30d',
        });

        res.send({
            id: user.id_user,
            name: user.name_user,
            rol: user.rol,
            foto: user.foto,
            color: user.color,
            email: user.email,
            show_mail: user.show_mail,
            description: user.descritpion,
            token,
        }); //un token es ese codigo giante
    } catch (err) {
        next(err);
    }
}

async function getUserById(req, res, next) {
    try {
        const { id_user } = req.params;

        const user = await userRepository.findUserById(id_user);

        if (!user) {
            const error = new Error('Usuario no Existe');

            error.code = 404;

            throw error;
        }

        res.send([
            {
                id: user.id_user,
                name: user.name_user,
                foto: user.foto,
                color: user.color,
                email: user.email,
                description: user.descritpion,
                show_mail: user.show_mail,
                rol: user.rol,
                isVerify: user.isVerify,
            },
        ]);
    } catch (err) {
        next(err);
    }
}
async function getUserByQuestionId(req, res, next) {
    try {
        const { id_question } = req.params;

        const user = await userRepository.findUserByQuestionId(id_question);
        res.send({ name: user.name_user, foto: user.foto, color: user.color });
    } catch (err) {
        next(err);
    }
}
async function getUserByName(req, res, next) {
    try {
        const { name_user } = req.params;

        const user = await userRepository.findUserByName(name_user);

        if (!user) {
            const error = new Error('Usuario no Existe');

            error.code = 404;

            throw error;
        }

        res.send({
            user,
        });
    } catch (err) {
        next(err);
    }
}

async function getUserByTag(req, res, next) {
    try {
        const { tag_name } = req.params;

        const users = await userRepository.findUserByTag(tag_name);

        res.send({
            users,
        });
    } catch (err) {
        next(err);
    }
}
async function getTagByUserId(req, res, next) {
    try {
        const { id } = req.params;
        const tags = await tagsRepository.findTagsByUserId(id);
        res.send({ tags });
    } catch (err) {
        next(err);
    }
}

async function updateUser(req, res, next) {
    try {
        const { id } = req.auth;
        const { name_user, show_mail, descritpion } = req.body;
        if (!id) {
            const error = new Error('Usuario no Existe');
            error.code = 404;
            throw error;
        }
        if (!name_user || !show_mail) {
            const error = new Error('Todos los campos son requeridos');
            error.code = 401;
            throw error;
        }
        if (show_mail !== '0' && show_mail !== '1') {
            const error = new Error('Valores permitidos true o false');
            error.code = 401;
            throw error;
        }
        //No deberíamos bajo ningún punto de vista permitir cambiar el email y password con tanta facilidad.
        //ya que el email podría corresponderse con el de otro usuario y se crearían incidencias en la tabla con mismos emails.

        const schema = Joi.object({
            name_user: Joi.string().required(),
            show_mail: Joi.string(),
            descritpion: Joi.string(),
        });

        schema.validateAsync({
            name_user,
            show_mail,
            descritpion,
        });

        const user = await userRepository.changeUserData(
            id,
            name_user,
            show_mail,
            descritpion
        );
        res.status = 201;
        res.send({
            id: user.id_user,
            name: user.name_user,
            email: user.email,
            show_mail: user.show_mail,
            description: user.descritpion,
        });
    } catch (err) {
        next(err);
    }
}

async function deleteUser(req, res, next) {
    try {
        const { rol } = req.auth;
        const { id_user } = req.params;

        if (rol !== 'admin') {
            const error = new Error('Solo admins pueden borrar usuarios');
            error.code = 403;
            throw error;
        }

        const user = await userRepository.findUserById(id_user);

        if (!user) {
            const error = new Error('El usuario no existe');
            error.code = 404;
            throw error;
        }
        await userRepository.deleteUserByid(id_user);

        res.status(204);
        res.send({ message: 'Usuario Eliminado' });
    } catch (err) {
        next(err);
    }
}
async function getUserByRolRandom(req, res, next) {
    try {
        const { rol } = req.params;
        const users = await userRepository.findUserByRolRandom(rol);

        res.send([
            {
                users,
            },
        ]);
    } catch (err) {
        next(err);
    }
}
async function getUserByRol(req, res, next) {
    try {
        const { rol } = req.params;
        const users = await userRepository.findUserByRol(rol);
        res.send([
            {
                users,
            },
        ]);
    } catch (err) {
        next(err);
    }
}
async function blockUser(req, res, next) {
    try {
        const { rol } = req.auth;
        const { id_user } = req.params;
        if (rol !== 'admin') {
            const error = new Error('Solo admins pueden bloquear usuarios');
            error.code = 403;
            throw error;
        }
        await userRepository.blockUserById(id_user);
        const { isVerify } = await userRepository.findVerifySituation(id_user);
        res.send({
            isVerify,
        });
    } catch (err) {
        next(err);
    }
}
async function unBlockUser(req, res, next) {
    try {
        const { rol } = req.auth;
        const { id_user } = req.params;
        if (rol !== 'admin') {
            const error = new Error('Solo admins pueden bloquear usuarios');
            error.code = 403;
            throw error;
        }
        await userRepository.unBlockUserById(id_user);
        const { isVerify } = await userRepository.findVerifySituation(id_user);
        res.send({
            isVerify,
        });
    } catch (err) {
        next(err);
    }
}

async function getVerifySituation(req, res, next) {
    try {
        const { id_user } = req.params;
        const { isVerify } = await userRepository.findVerifySituation(id_user);
        res.send({
            isVerify,
        });
    } catch (err) {
        next(err);
    }
}
async function promoteToExpert(req, res, next) {
    try {
        const { id_user } = req.params;
        const { rol } = req.auth;
        if (rol !== 'admin') {
            const error = new Error('Solo admins pueden promover usuarios');
            error.code = 403;
            throw error;
        }
        await userRepository.ascenderUsuarioAExperto(id_user);
        res.send({
            message: 'Usuario Promovido a Experto',
        });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    register,
    validateUser,
    login,
    getUserById,
    getUserByName,
    getUserByTag,
    getUserByQuestionId,
    getTagByUserId,
    updateUser,
    deleteUser,
    addAvatar,
    getUserByRolRandom,
    getUserByRol,
    blockUser,
    unBlockUser,
    getVerifySituation,
    promoteToExpert,
};
