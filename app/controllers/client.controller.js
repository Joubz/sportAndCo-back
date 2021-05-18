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

/**
 * Récupère la liste des mails clients
 * @param {*} req Requête
 * @param {*} res Réponse Retourne la code http 200 et la liste des mails
 * @returns L'erreur retournée par le service
 */
const getListMailClient = async (req, res) => {
    let listMailClient = [];

    try {
        listMailClient = await services.client.getListMailClient();
    } catch(err) {
        return services.exception.generateException(err, res);
    }
    res.status(200).json(listMailClient);
};

module.exports = {
    createClient,
    getListMailClient
};
