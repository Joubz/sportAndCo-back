"use strict";

const { transaction } = require("../../database");

/**
 * Insère une commande dans la BDD
 * @param order La commande à enregistrer
 */
const postBill = async (order) => {

    const query =
        'INSERT INTO ' +
        'BILL ' +
        'SET ?';

    const params = [{

        ORDER_ID: order.id,
        DESCRIPTION: order.bill.description,
        BILL_DATE: order.bill.billDate,
        BILL_PRICE: order.bill.billPrice

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
    postBill
}