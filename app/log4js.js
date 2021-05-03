const log4js = require("log4js");

/**
 * Configuration de log4js avec les fichiers de logs
 */
log4js.configure({
    appenders: {
        general: {
            type: "file", filename: "general.log"
        }
    },
    categories: {
        default: {
            appenders: ["general"], level: "debug"
        }
    }
});

module.exports = log4js.getLogger("general");
