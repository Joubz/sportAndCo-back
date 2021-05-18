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
		id: foundUser[0].CLIENT_ID,
		email: foundUser[0].EMAIL,
		authenticationToken: token
	});
};

module.exports = {
	createClient,
	loginClient
};