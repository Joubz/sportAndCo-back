"use strict";

const { transaction } = require("../../database");

/**
 * Récupère toutes les catégories depuis la bdd
 * @return queryRes la liste des catégories trouvés
 */
const getListCategory = async () => {
    const query =
        'SELECT * ' +
        'FROM CATEGORY';

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
    getListCategory
}
