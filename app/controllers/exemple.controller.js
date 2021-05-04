"use strict";

const services = require('../services');

/**
 * Récupère l'exemple dont l'id est passé en paramètre de la route
 * @param {*} req Requête
 * @param {*} res Réponse
 * @returns L'exemple demandé / une erreur sinon
 */
const getExemple = async (req, res) => {
    let foundExemple = [];

    try {
        foundExemple = await services.exemple.getExemple(req.params.exempleId);
    } catch(err) {
        return services.exception.generateException(err, res);
    }
    res.status(200).json(foundExemple);
};

/**
 * Récupération de la liste de exemples
 * @param {*} req Requête
 * @param {*} res Réponse
 * @returns L'erreur retournée par le service ou une confirmation (code 200)
 */
const getListExemple = async (req, res) => {
    let listExemple = [];

    try {
        listExemple = await services.exemple.getListExemple();
    } catch (err) {
        return services.exception.generateException(err, res);
    }

    res.status(200).json(listExemple);
};

/**
 * Ajoute une nouvelle exemple
 * @param {*} req Requête
 * @param {*} res Réponse
 * @returns L'erreur retournée par le service ou une confirmation (code 200)
 */
const addExemple = async (req, res) => {
    let newExemple = req.body.newExemple;

    /*
    Exemple JSON dans body (postman)
     {
      "newExemple": {
            "title": "test",
            "description": "desc"
          }
      }
     */

    try {
        await services.exemple.addExemple(newExemple);
    } catch (err) {
        return services.exception.generateException(err, res);
    }

    res.status(200).json();
}

/**
 * Modifie le contenu d'un exemple
 * @param {*} req Requête
 * @param {*} res Réponse
 * @returns L'erreur retournée par le service ou une confirmation (code 200)
 */
const editExemple = async(req, res) => {
    let newExemple = req.body.newExemple;

    try {
        await services.exemple.editExemple(req.params.exempleId, newExemple);
    } catch (err) {
        return services.exception.generateException(err, res);
    }

    res.status(200).json();
}

/**
 * Supprime un exemple
 * @param {*} req Requête
 * @param {*} res Réponse
 * @returns L'erreur retournée par le service ou une confirmation (code 200)
 */
const deleteExemple = async (req, res) => {
    try {
        await services.exemple.deleteExemple(req.params.exempleId);
    } catch (err) {
        return services.exception.generateException(err, res);
    }

    res.status(200).json();
}

module.exports = {
    getExemple,
    getListExemple,
    addExemple,
    editExemple,
    deleteExemple
}
