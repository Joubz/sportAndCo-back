"use strict";

const { transaction } = require("../../database");

/**
 * Récupère tous les équipements selon les critères de recherche (nom équipement, date de début et de fin)
 * @param equipmentName Le nom de l'équipement
 * @param startDate La date de début de location
 * @param endDate La date de fin de location
 * @return queryRes la liste des équipements trouvés
 */
const searchEquipmentWithName = async (equipmentName, startDate, endDate) => {
    const query =
        'SELECT ' +  'EQUIPMENT_ID, EQUIPMENT_NAME, PRICE, IMAGE_LINK_1 ' +
        'FROM EQUIPMENT_VIEW ' +
        'WHERE EQUIPMENT_NAME LIKE ? AND ' +
        'START_DATE < ? AND ' +
        'END_DATE > ? ';

    const params = ["%" + " " + "%", startDate, endDate];

    let [queryRes] = [];

    await transaction(async connection => {
        try {
            [queryRes] = await connection.query(query, params);
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
 * Récupère tous les équipements selon les critères de recherche (nom équipement, date de début et de fin et catégorie)
 * @param equipmentName Le nom de l'équipement
 * @param startDate La date de début de location
 * @param endDate La date de fin de location
 * @param categoryId L'identifiant de la catégorie
 * @return queryRes la liste des équipements trouvés
 */
const searchEquipmentWithCategory = async (equipmentName, startDate, endDate, categoryId) => {
    const query =
        'SELECT ' +  'EQUIPMENT_ID, EQUIPMENT_NAME, PRICE, IMAGE_LINK_1 ' +
        'FROM EQUIPMENT_VIEW ' +
        'LEFT OUTER JOIN CATEGORY ON EQUIPMENT_VIEW.CATEGORY_ID = CATEGORY.CATEGORY_ID ' +
        'WHERE EQUIPMENT_NAME LIKE ? AND ' +
        'START_DATE < ? AND ' +
        'END_DATE > ? AND ' +
        'CATEGORY.CATEGORY_ID LIKE ? ';


    const params = ["%" + equipmentName + "%", startDate, endDate, categoryId ];

    let [queryRes] = [];

    await transaction(async connection => {
        try {
            [queryRes] = await connection.query(query, params);
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
 * Récupère tous les équipements selon les critères de recherche (nom équipement, date de début et de fin et la localisation)
 * @param equipmentName Le nom de l'équipement
 * @param startDate La date de début de location
 * @param endDate La date de fin de location
 * @param metropolisesId L'identifiant de la métropole
 * @return queryRes la liste des équipements trouvés
 */
const searchEquipmentWithMetropolises = async (equipmentName, startDate, endDate, metropolisesId) => {
    const query =
        'SELECT ' +  'EQUIPMENT_ID, EQUIPMENT_NAME, PRICE, IMAGE_LINK_1 ' +
        'FROM EQUIPMENT_VIEW ' +
        'LEFT OUTER JOIN METROPOLISES ON EQUIPMENT_VIEW.METROPOLISES_ID = METROPOLISES.METROPOLISES_ID ' +
        'WHERE EQUIPMENT_NAME LIKE ? AND ' +
        'START_DATE < ? AND ' +
        'END_DATE > ? AND ' +
        'METROPOLISES.METROPOLISES_ID LIKE ? ';


    const params = ["%" + equipmentName + "%", startDate, endDate, metropolisesId];

    let [queryRes] = [];

    await transaction(async connection => {
        try {
            [queryRes] = await connection.query(query, params);
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
 * Récupère tous les équipements selon les critères de recherche (tous les paramètres)
 * @param equipmentName Le nom de l'équipement
 * @param startDate La date de début de location
 * @param endDate La date de fin de location
 * @param categoryId L'identifiant de la catégorie
 * @param metropolisesId L'identifiant de la métropole
 * @return queryRes la liste des équipements trouvés
 */
const searchEquipmentWithCategoryAndMetropolises = async (equipmentName, startDate, endDate, categoryId, metropolisesId) => {
    const query =
        'SELECT ' +  'EQUIPMENT_ID, EQUIPMENT_NAME, PRICE, IMAGE_LINK_1 ' +
        'FROM EQUIPMENT_VIEW ' +
        'LEFT OUTER JOIN CATEGORY ON EQUIPMENT_VIEW.CATEGORY_ID = CATEGORY.CATEGORY_ID ' +
        'LEFT OUTER JOIN METROPOLISES ON EQUIPMENT_VIEW.METROPOLISES_ID = METROPOLISES.METROPOLISES_ID ' +
        'WHERE EQUIPMENT_NAME LIKE ? AND ' +
        'START_DATE < ? AND ' +
        'END_DATE > ? AND ' +
        'CATEGORY.CATEGORY_ID LIKE ? AND ' +
        'METROPOLISES.METROPOLISES_ID LIKE ? ';


    const params = ["%" + equipmentName + "%", startDate, endDate, categoryId, metropolisesId];

    let [queryRes] = [];

    await transaction(async connection => {
        try {
            [queryRes] = await connection.query(query, params);
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
    searchEquipmentWithName,
    searchEquipmentWithCategory,
    searchEquipmentWithMetropolises,
    searchEquipmentWithCategoryAndMetropolises
}
