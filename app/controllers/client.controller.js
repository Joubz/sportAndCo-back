"use strict";

const services = require('../services');
const bcrypt = require('bcrypt');

/**
 * Ajoute un nouveau client
 * @param {*} req Requête
 * @param {*} res Réponse
 * @returns L'erreur retournée par le service ou une confirmation (code 200)
 */
const createClient = async (req, res) => {
    let newClient = req.body.newClient;

    newClient.password = bcrypt.hashSync(newClient.password, 8);

    try {
        await services.client.createClient(newClient);

        await services.mail.sendConfirmationMail(newClient.firstName, newClient.lastName, newClient.email);
    } catch (err) {
        return services.exception.generateException(err, res);
    }

    res.status(200).json();
};

module.exports = {
    createClient
};
