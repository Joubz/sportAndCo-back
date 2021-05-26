"use strict";

const services = require("../services");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

/**
 * Ajoute un nouveau loueur
 * @param {*} req Requête
 * @param {*} res Réponse
 * @returns L'erreur retournée par le service ou une confirmation (code 200)
 */
const createRenter = async (req, res) => {
	let newRenter = req.body.newRenter;

	 newRenter.password = bcrypt.hashSync(newRenter.password, 8);

	try {
		await services.renter.createRenter(newRenter);

		await services.mail.sendConfirmationMail(
			newRenter.firstName,
			newRenter.lastName,
			newRenter.email
		);
	} catch (err) {
		return services.exception.generateException(err, res);
	}

	res.status(200).json();
};

/**
 * Récupère la liste des mails loueurs
 * @param {*} req Requête
 * @param {*} res Réponse Retourne la code http 200 et la liste des mails
 * @returns L'erreur retournée par le service
 */
 const getListMailRenter = async (req, res) => {
    let listMailRenter = [];

    try {
        listMailRenter = await services.renter.getListMailRenter();
    } catch(err) {
        return services.exception.generateException(err, res);
    }
    res.status(200).json(listMailRenter);
};

module.exports = {
	createRenter,
	getListMailRenter
};
