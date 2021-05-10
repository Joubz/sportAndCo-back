"use strict";

const { transaction } = require("../../database");

/**
 * Récupère toutes les métropoles depuis la bdd
 * @return queryRes la liste des métropoles trouvés
 */
const getListMetropolises = async () => {
    const query =
        'SELECT * ' +
        'FROM METROPOLISES';

    let [queryRes, fields] = [];

    await transaction(async connection => {
        try {
            [queryRes, fields] = await connection.query(query);
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
    getListMetropolises
}
