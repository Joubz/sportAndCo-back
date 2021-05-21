"use strict";

const { transaction } = require("../../database");

/**
 * Crée un nouveau loueur en base.
 * @param {*} newRenter Le loueur reçu
 */
const createRenter = async (newRenter) => {
  const query = "INSERT INTO RENTER SET ?";

  const params = [
    {
      COMPANY_NAME: newRenter.company_name,
      FIRST_NAME: newRenter.firstName,
      LAST_NAME: newRenter.lastName,
      EMAIL: newRenter.email,
      PASSWORD: newRenter.password,
      PHONE: newRenter.phone,
      BIRTH_DATE: newRenter.birthDate,
      ADDRESS: newRenter.address,
      ADDITIONAL_ADDRESS: newRenter.additionalAddress,
      POSTAL_CODE: newRenter.postalCode,
      CITY: newRenter.city,
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
};

module.exports = {
  createRenter
}
