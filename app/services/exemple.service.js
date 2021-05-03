"use strict";

const { transaction } = require("../../database");

/**
 * Récupère un exemple depuis la BDD
 * @param {*} id Identifiant de l'exemple
 * @returns L'exemple trouvé, une erreur sinon
 */
const getExemple = async (exempleId) => {

    const query = 'SELECT * ' +
        'FROM EXEMPLE ' +
        'WHERE EXEMPLE_ID = ?';

    let [queryRes, fields] = [];

    await transaction(async connection => {
        try {
            [queryRes, fields] = await connection.query(query, parseInt(exempleId));
        } catch (err) {
            throw new Error(err);
        }
    })
        .catch((err) => {
            throw err;
        });

    return queryRes;
}

module.exports = {
    getExemple
}
