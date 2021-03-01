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
    },
    newFriendValidate: (data) => {

        const newFriendValidateSchema = Joi.object({
            name: Joi.string().max(255).required(),
            location: Joi.string().max(30).required(),
            phoneNumber: Joi.string().max(13).min(10).required(),
            aboutFriend: Joi.string().min(30).required(),
            status: Joi.string().max(50).required()
        })

        return newFriendValidateSchema.validate(data);
    }
}