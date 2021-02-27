require("dotenv/config")
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const validate = require("../validate")
const jwt = require("jsonwebtoken")

module.exports = {

    // @ Register User.
    registerUser: async (req, res) => {

        // @ Validate User Inputs. 
        const { error } = validate.registerValidate(req.body)
        if (error) return res.status(400).send(error.message)

        // @ Check If Email Exists. 
        const emailExists = await User.findOne({ email: req.body.email})
        if(emailExists) return res.status(400).send("Email Already Exists, Registration Failed...!")

        // @ Hashed Password. 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        // @ Create New User. 
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        
        try{
            const savedUser = await user.save()
            res.send(savedUser)
        }catch(err){
            res.status(400).send(err.message)
        }
    },

    // @ Login.
    login: async (req, res) => {

        // @ Validate User Inputs. 
        const { error } = validate.loginValidate(req.body)
        if (error) return res.status(400).send(error.message)

        // @ Check If Email Exists. 
        const user = await User.findOne({ email: req.body.email})
        if(!user) return res.status(400).send("Invalid Email...!")

        // @ Compare If Passwords Match. 
        const matchPassword = await bcrypt.compare(req.body.password, user.password)
        if(!matchPassword) return res.status(400).send("Invalid Password...!")

        const token = jwt.sign({
            _id: user._id,
            email: user.email
        }, process.env.TOKEN_SECRET)

        res.header("auth-token", token).send(token)
    },

    // @ Friends API.
    getAllFriends: (req, res) => {

    }
}