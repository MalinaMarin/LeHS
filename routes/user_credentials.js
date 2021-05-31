const Dispatcher = require("../helpers/dispatcher");
const userController = require("../controllers/Auth.Controller");
//const { StatusCodes } = require("http-status-codes");

const dispatcher = new Dispatcher();

dispatcher.on("POST", "/register", userController.register);
dispatcher.on("POST", "/login", userController.login);