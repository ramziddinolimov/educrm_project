const CustomError = require("../helpers/customError")

module.exports = async function customErrorMiddleware(req, res, next){
    res.error = CustomError
    next();
}