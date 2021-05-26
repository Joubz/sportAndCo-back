"use strict";

const services = require('../services');

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

module.exports = {
    getNotAcceptList,
    acceptRenter,
    deleteRenter,
    getRenterList
}
