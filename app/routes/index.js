const exemple = require("./exemple.routes");
const equipment = require("./equipment.route");
const order = require("./order.routes");
const category = require("./category.routes");
const metropolises = require("./metropolises.routes");
const payment = require("./payment.routes");
const client = require("./client.routes");
const admin = require("./admin.routes");
const renter = require("./renter.routes")

module.exports = {
    exemple,
    equipment,
    order,
    category,
    metropolises,
    payment,
    client,
    admin,
    renter
};
