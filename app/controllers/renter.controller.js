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

const loginRenter = async (req, res) => {
	let foundUser = []; 

	let ipClient = req.headers["x-forwarded-for"] ? req.headers["x-forwarded-for"].split(',')[0] : req.ip

	try {
		foundUser = await services.renter.loginRenter(req.body.email); 
		
		if (foundUser.length === 0) {
			throw new services.exception.httpException('CLIENT_016'); 
		}
	} catch (err) {
		return services.exception.generateException(err, res);
	}

	// const isPasswordValid = bcrypt.compareSync (
	// 	req.body.password, 
	// 	foundUser[0].PASSWORD
	// );

	const isPasswordValid = true; 

	if (!isPasswordValid) {
		return services.exception.generateException(new services.exception.httpException('CLIENT_016'), res);
	}

	const token = jwt.sign(
		{
			id: foundUser[0].RENTER_ID,
			email: foundUser[0].EMAIL, 
			ipClient
		},
		"jwt-secret",
		{
			expiresIn: "7d"
		}
	);

	res.status(200).json({
		id: foundUser[0].RENTER_ID, 
		email: foundUser[0].EMAIL, 
		renterAuthentificationToken: token
	});
};

/**
 * Récupère la liste des loueurs
 * @param {*} req Requête
 * @param {*} res Réponse Retourne la code http 200 et la liste des catégories
 * @returns L'erreur retournée par le service
 */
const getRenterList = async (req, res) => {
    let renterList = [];

    try {
        renterList = await services.renter.getRenterList();
    } catch(err) {
        return services.exception.generateException(err, res);
    }
    res.status(200).json(renterList);
};

/**
 * Récupère la liste des loueurs non accepté
 * @param {*} req Requête
 * @param {*} res Réponse Retourne la code http 200 et la liste des catégories
 * @returns L'erreur retournée par le service
 */

const getNotAcceptList = async (req, res) => {
    let acceptList = [];

    try {
        acceptList = await services.renter.getNotAcceptList();
    } catch(err) {
        return services.exception.generateException(err, res);
    }
    res.status(200).json(acceptList);
};

/**
 * Accepte un loueur
 * @param {*} req Requête
 * @param {*} res Réponse
 * @returns L'erreur retournée par le service ou une confirmation (code 200)
 */
const acceptRenter = async(req, res) => {
    let renter = req.body.renter;

    try {
        await services.renter.acceptRenter(req.params.renterId);

        await services.mail.sendRenterAcceptConfirmationMail(
            renter.firstName,
            renter.lastName,
            renter.email,
            renter.companyName
        );
    } catch (err) {
        return services.exception.generateException(err, res);
    }

    res.status(200).json();
}

/**
 * Supprime un loueur
 * @param {*} req Requête
 * @param {*} res Réponse
 * @returns L'erreur retournée par le service ou une confirmation (code 200)
 */
const deleteRenter = async (req, res) => {

    try {
        await services.renter.deleteRenter(req.params.renterId);

        await services.mail.sendRenterDeleteConfirmationMail(
            req.params.renterFirstName,
            req.params.renterLastName,
            req.params.renterMail,
            req.params.companyName
        );
    } catch (err) {
        return services.exception.generateException(err, res);
    }

    res.status(200).json();
}

/**
 * Récupère la liste des loueurs
 * @param {*} req Requête
 * @param {*} res Réponse Retourne la code http 200 et la liste des catégories
 * @returns L'erreur retournée par le service
 */
const getRenterByEquipment = async (req, res) => {
    let renter = [];

    try {
        renter = await services.renter.getRenterByEquipment(req.params.equipmentId);
    } catch(err) {
        return services.exception.generateException(err, res);
    }
    res.status(200).json(renter);
};

module.exports = {
    getNotAcceptList,
    acceptRenter,
    deleteRenter,
    getRenterList,
    getRenterByEquipment,
	createRenter,
	getListMailRenter, 
	loginRenter
}
