const sendgrid = require('@sendgrid/mail');
const path = require('path');
const fs = require('fs').promises;
const sharp = require('sharp');
const { nanoid } = require('nanoid');

sendgrid.setApiKey(process.env.SENDGRID_API);

async function sendMail({ to, subject, message }) {
    try {
        const msg = {
            to,
            subject,
            from: process.env.SENDGRID_FROM,
            text: message,
        };

        await sendgrid.send(msg);
    } catch (error) {
        console.error(error);
        throw new Error('Error enviando mail');
    }
}

//Creamos la ruta al directorio de uploads
const uploadsDir = path.join(__dirname, process.env.UPLOADS_DIRECTORY);

async function deleteAvatar({ file }) {
    const avatarPath = path.join(uploadsDir, file);
    await fs.unlink(avatarPath);
}

async function saveAvatar({ file }) {
    try {
        //Nos aseguramos de que el directorio existe
        await fs.mkdir(uploadsDir, { recursive: true });

        //Cargamos la imagen en sharp
        const image = sharp(file.data);

        //Modificamos el tamaño de la imagen a un estandar
        image.resize(500);

        //Creamos un nombre de fichero aleatorio para la imagen
        const fileName = `${nanoid(20)}.jpg`;

        //Guardamos la imagen en el directorio uploads
        await image.toFile(path.join(uploadsDir, fileName));

        //Devolvemos el nombre de fichero
        return fileName;
    } catch (error) {
        console.error(error);
        throw new Error('Error subiendo imagen');
    }
}
function random_bg_color() {
    var x = Math.floor(Math.random() * 180);
    var y = Math.floor(Math.random() * 180);
    var z = Math.floor(Math.random() * 180);
    return 'rgb(' + x + ',' + y + ',' + z + ')';
}

module.exports = {
    sendMail,
    saveAvatar,
    deleteAvatar,
    random_bg_color,
};
