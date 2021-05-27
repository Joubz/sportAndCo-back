"use strict";

const exception = require('../services/exception.service');
const fs = require('fs');
const util = require('util');

/**
 * Enregistre l'image reçue dans le dossiers /images du serveur
 * @param {*} image Image au format base64
 * @returns Le chemin relatif vers l'image (à partir de la racine du serveur)
 */
const saveImage = async (image) => {
    let newImage = null;

    try {
        newImage = reqBase64ToImage(image);
    } catch (err) {
        throw err;
    }

    newImage.name = new Date().getTime() + '.' + newImage.type[1];

    // Création du dossier d'images s'il n'existe pas
    if (!fs.existsSync('./images/')) {
        fs.mkdirSync('./images/');
    }

    // Enregistrement de l'image sur le disque
    try {
        const writeFile = util.promisify(fs.writeFile);
        await writeFile('./images/' + newImage.name, newImage.data);
    } catch (err) {
        throw new Error(err);
    }

    return '/images/' + newImage.name;
};

/**
 * Convertit une image au format base64 en fichier
 * @param {*} imageBase64 L'image au format base64
 * @returns Le fichier image créé
 */
function reqBase64ToImage(imageBase64) {
    const matches = imageBase64.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const image = {};

    if (!matches || matches.length !== 3) {
        throw new exception.httpException('CLIENT_011');
    }

    image.type = matches[1].split('/');
    image.data = new Buffer.from(matches[2], 'base64');

    if (image.type[1].toLowerCase() !== 'jpeg' && image.type[1].toLowerCase() !== 'jpg' && image.type[1].toLowerCase() !== 'png') {
        throw new exception.httpException('CLIENT_011');
    }

    if (parseInt(Buffer.byteLength(image.data)/1024)>2000) {
        throw new exception.httpException('CLIENT_013');
    }

    return image;
}

module.exports = {
    saveImage
}
