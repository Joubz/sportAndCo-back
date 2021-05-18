"use strict";

const services = require("../services");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const md5 = require('md5');

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

		await services.mail.sendConfirmationMail(
			newClient.firstName,
			newClient.lastName,
			newClient.email
		);
	} catch (err) {
		return services.exception.generateException(err, res);
	}

	res.status(200).json();
};

/**
 * Récupère les informations du client et crée un nouveau JWT
 * @param {*} req Requête
 * @param {*} res Réponse
 * @returns une erreur, ou le token d'authentification du client ainsi que ses informations
 */
const loginClient = async (req, res) => {
	let foundUser = [];
	let loginClient = req.body.loginClient;

	let ipClient = req.headers["x-forwarded-for"] ? req.headers["x-forwarded-for"].split(',')[0] : req.ip;

	try {
		foundUser = await services.client.loginClient(loginClient.email);

		if (foundUser.length === 0) {
			throw new services.exception.httpException('CLIENT_016');
		}
	} catch (err) {
		return services.exception.generateException(err, res);
	}

	const isPasswordValid = bcrypt.compareSync(
		loginClient.password,
		foundUser[0].PASSWORD
	);

	if (!isPasswordValid) {
		return services.exception.generateException(new services.exception.httpException('CLIENT_017'), res);
	}

	const token = jwt.sign(
		{
			id: foundUser[0].CLIENT_ID,
			email: foundUser[0].EMAIL,
			ipClient
		},
		"jwt-secret",
		{
			expiresIn: "7d"
		}
	);

	res.status(200).json({
		client : {
			CLIENT_ID: foundUser[0].CLIENT_ID,
			PASSWORD: '',
			LAST_NAME: foundUser[0].LAST_NAME,
			FIRST_NAME: foundUser[0].FIRST_NAME,
			EMAIL: foundUser[0].EMAIL,
			PHONE: foundUser[0].PHONE,
			BIRTH_DATE: foundUser[0].BIRTH_DATE,
			ADDRESS: foundUser[0].ADDRESS,
			ADDITIONAL_ADDRESS: foundUser[0].ADDITIONAL_ADDRESS,
			POSTAL_CODE: foundUser[0].POSTAL_CODE,
			CITY: foundUser[0].CITY
		},
		authenticationToken: token
	});
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
	loginClient,
    getListMailClient
};
