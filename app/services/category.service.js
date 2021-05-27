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

/**
 * Récupère la catégorie associé à l'équipement
 * @param equipmentId l'id de l'équipement
 * @return La catégorie de l'équipement trouvé
 */
const getCategoryByEquipment = async (equipmentId) => {
    const query =
        'SELECT category.* ' +
        'FROM CATEGORY ' +
        'JOIN EQUIPMENT ' +
        'ON CATEGORY.CATEGORY_ID = EQUIPMENT.CATEGORY_ID ' +
        'WHERE EQUIPMENT.EQUIPMENT_ID = ?';

    let [queryRes, fields] = [];

    await transaction(async connection => {
        try {
            [queryRes, fields] = await connection.query(query, parseInt(equipmentId));
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
    getListCategory,
    getCategoryByEquipment
}
