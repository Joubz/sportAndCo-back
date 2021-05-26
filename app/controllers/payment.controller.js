"use strict";

const services = require('../services');
const jwt = require('jsonwebtoken');

/**
 * Récupère les cartes de paiement du client l'id est passé en paramètre de la route
 * @param req Requête
 * @param res Réponse
 * @return La commande demandé / une erreur sinon
 */
const getCardPayment = async (req, res) => {
    let foundCard = [];

    try {
        foundCard = await services.payment.getCardPayment(req.params.clientId);

    } catch(err) {
        return services.exception.generateException(err, res);
    }
    res.status(200).json(foundCard);
};

/**
 * Ajoute une carte de paiement du client l'id est passé en paramètre de la route
 * @param req Requête
 * @param res Réponse
 * @return La commande demandé / une erreur sinon
 */
const postCardPayment = async (req, res) => {
    let payment = req.body.payment;

    try {
        await services.payment.postCardPayment(payment);
    } catch(err) {
        return services.exception.generateException(err, res);
    }
    res.status(200).json();

};

module.exports = {
    getCardPayment,
    postCardPayment
}
