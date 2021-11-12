const joi = require("joi");

module.exports = class Validations{
    static async UserSignUpValidation(data, CustomError){
        return await joi.object({
            username: joi.string().required().regex(/[A-Za-z]{2,}[_-]?[A-Za-z0-9]{2,}$/).error(new CustomError(400, "Username is not valid")),
            name: joi.string().required().min(5).max(64).error(new CustomError(400, "Name is not valid")),
            email: joi.string().error(new CustomError(400, "Email is not valid")),
            password: joi.string().required().min(5).max(128).error(new CustomError(400, "Password is not valid")),
            gender: joi.string().required().valid("male", "female").error(new CustomError(400, "Given gender option is not available"))
        }).validateAsync(data)
    }
    static async UserSignInValidation(data, CustomError){
        return await joi.object({
            username: joi.string().required().regex(/[A-Za-z]{2,}[_-]?[A-Za-z0-9]{2,}$/).error(new CustomError(400, "Username is not valid")),
            password: joi.string().required().min(5).max(128).error(new CustomError(400, "Password is not valid")),
        }).validateAsync(data)
    }
}