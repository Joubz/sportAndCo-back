"use strict";

const { transaction } = require("../../database");

/**
 * Récupère un équipement depuis la bdd
 * @param equipmentId id de l'équipement
 * @return queryRes l'équipement trouvé
 */
const getEquipment = async (equipmentId) => {
    const query =
        'SELECT * ' +
        'FROM EQUIPMENT_VIEW ' +
        'WHERE EQUIPMENT_ID = ? ';

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

/**
 * Récupère tous les équipements depuis la bdd
 * @return queryRes la liste des équipements trouvés
 */
const getListEquipment = async () => {
    const query =
        'SELECT ' +  'EQUIPMENT_ID, EQUIPMENT_NAME, PRICE, IMAGE_LINK_1 ' +
        'FROM EQUIPMENT';

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
 * Crée un nouveau équipement en base.
 * @param {*} newEquipment L'équipement reçu
 */
const addEquipment =  async (newEquipment) => {
    const query = "INSERT INTO EQUIPMENT SET ?";

    const params = [
        {
            RENTER_ID: newEquipment.renter.id,
            CATEGORY_ID : newEquipment.category.id,
            EQUIPMENT_NAME: newEquipment.name,
            DESCRIPTION: newEquipment.description,
            START_DATE: newEquipment.startDate,
            END_DATE: newEquipment.endDate,
            PRICE: newEquipment.price,
            TOTAL_QUANTITY: newEquipment.totalQuantity,
            IMAGE_LINK_1: newEquipment.imageLink1,
            IMAGE_LINK_2: newEquipment.imageLink2,
            IMAGE_LINK_3: newEquipment.imageLink3,
        },
    ];

    await transaction(async (connection) => {
        try {
            await connection.query(query, params);
        } catch (err) {
            throw new Error(err);
        }
    }).catch((err) => {
        throw err;
    });
}

module.exports = {
    getEquipment,
    getListEquipment,
    addEquipment
}
