const Joi = require("joi")

module.exports = {
    registerValidate: (data) => {

        const registerValidateSchema = Joi.object({
            name: Joi.string().min(6).required(),
            email: Joi.string().min(6).required().email(),
            password: Joi.string().min(6).required()
        })

        return registerValidateSchema.validate(data);
    },
    loginValidate: (data) => {

        const loginValidateSchema = Joi.object({
            email: Joi.string().min(6).required().email(),
            password: Joi.string().min(6).required()
        })

        return loginValidateSchema.validate(data);
    }
}