const { configException } = require("../configs");
const logs = require('../log4js');

/**
 * Fonction à mettre dans le try catch (gestionnaire d'exception)
 * @param {*} e
 * @param {*} res
 * @returns une requête http avec son status et un message d'erreur
 */
exports.generateException = (e, res) => {

    // Renvoie exception client
    if (e instanceof this.httpException || e instanceof this.formException) {
        e.sendException(res);
    }
    // Renvoie exception dev
    else {
        logs.error(e);
        return res.status(500).json({ message: "Le site a rencontré une erreur interne. Veuillez nous excuser pour la gêne occasionnée." });
    }
}

/**
 *
 * @class httpException
 * @classdesc Concerne les erreurs de requête http
 */
exports.httpException = class httpException extends Error {
    /**
     * @constructor
     * @param {*} code
     */
    constructor(code) {
        let message, status;
        configException.forEach(element => {
            if (element.code === code) {
                message = element.message;
                status = element.status
            }
        });

        super(message);
        this.code = code;
        this.status = status;
    }

    /**
     *
     * @param {*} res
     * @returns une requête http avec son status et un message d'erreur
     */
    sendException(res) {
        return res.status(this.status).json({ message: this.message });
    }
}

/**
 *
 * @class formException
 * @classdesc Concerne les erreurs liées à un formulaire de saisie
 */
exports.formException = class formException extends Error {
    /**
     * @constructor
     * @param {*} code
     * @param {*} field
     */
    constructor(code, field) {
        let message, status;
        configException.forEach(element => {
            if (element.code === code) {
                message = field + " : " + element.message;
                status = element.status
            }
        });

        super(message);
        this.code = code;
        this.status = status;
    }
    /**
     *
     * @param {*} res
     * @returns une requête http avec son status et un message d'erreur
     */
    sendException(res) {
        return res.status(this.status).json({ message: this.message });
    }
}
