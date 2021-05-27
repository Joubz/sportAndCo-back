"use strict";

const { transaction } = require("../../database");

/**
 * Récupère une commande depuis la BDD
 * @param {*} orderId Identifiant de la commande
 * @returns La commande trouvé, une erreur sinon
 */
const getCardPayment = async (clientId) => {

    const query = 'SELECT CARD_ID, CARD_NUMBER, CARD_NAME, EXPIRATION_DATE, CVV ' +
        'FROM CARD ' +
        'WHERE CLIENT_ID = ?';

    let [queryRes, fields] = [];

    await transaction(async connection => {
        try {
            [queryRes, fields] = await connection.query(query, parseInt(clientId));
        } catch (err) {
            throw new Error(err);
        }
    })
        .catch((err) => {
            throw err;
        });

    return queryRes;
}

/**
 * Insère une carte de paiement dans la BDD
 * @param {*} title Titre de l'exemple, description
 */
const postCardPayment = async (payment) => {

    const query =
    'INSERT INTO ' +
    'CARD ' +
    'SET ?';

    const params = [{
        CARD_NUMBER: payment.cardNumber,
        CLIENT_ID: payment.client.id,
        CARD_NAME: payment.cardName,
        EXPIRATION_DATE: payment.expirationDate,
        CVV: payment.CVV
    }];

    await transaction(async connection => {
        try {
            await connection.query(query, params);
        } catch (err) {
            throw new Error(err);
        }
    })
        .catch((err) => {
            throw err;
        });

}

module.exports = {
    getCardPayment,
    postCardPayment

}
