require("dotenv/config")
const bcrypt = require("bcryptjs")
const User = require("../models/User")
const validate = require("../validate")
const jwt = require("jsonwebtoken")
const Friend = require("../models/Friend")


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
    getAllFriends: async (req, res) => {

        // @ Get All Friends.         
        try{
            const allFriends = await Friend.find().select("name location")
            res.json({
                Friends: allFriends
            })
        }catch(err){
            res.status(400).json({
                error: "400: Bad Request",
                message: err.message
            })
        }
    },
    newFriend: async (req, res) => {
        
        // @ Validate Inputs. 
        const { error } = validate.newFriendValidate(req.body)
        if(error) return res.status(400).json({
            error: "400: Bad Request",
            message: error.message
        })

        // @ Check If Friend Exists. 
        const friendExists = await Friend.findOne({ name: req.body.name})
        if(friendExists) return res.status(400).json({
            error: "400: bad Request",
            message: "Friend Exists In The Database"
        })

        // @ New Friend. 
        const friend = new Friend({
            name: req.body.name,
            location: req.body.location,
            phoneNumber: req.body.phoneNumber,
            aboutFriend: req.body.aboutFriend,
            status: req.body.status
        })

        try{
            const newFriend = await friend.save()
            res.send(newFriend)
        }catch(err){
            res.status(400).send(err.message)
        }
    },
    updateFriend: async (req, res) => {
        const ID = req.params.id

        // @ Update Friend By Id. 
        try{
            const updatedData = await Friend.findByIdAndUpdate({_id: ID}, { $set: req.body})
            res.json(updatedData)
        }catch(err){
            res.status(400).json({
                error: "400: Bad Request",
                message: err.message
            })
        } 
    },
    deleteFriend: async (req, res) =>{
        const ID = req.params.id

        try{
            // @ Delete Friend From The Database. 
            const deletedFriend = await Friend.findByIdAndRemove({ _id: ID})
            res.json({
                deletedFriendData: deletedFriend
            })
        }catch(err){
            res.status(400).json({
                error: "400: Bad Request",
                message: err.message
            })
        }
    },
    getFriendInfo: async (req, res) => {
        const ID = req.params.id

        try{
            // @ Get Friend Info By ID. 
            const results = await Friend.findById({ _id: ID })
            res.json({
                results,
            })
        }catch(err){
            res.status(400).json({
                error: "400: Bad Request",
                message: err.message
            })
        }
    },

    // @ Error Handling. 
    error404: (req, res, next) => {
        res.status(404).json({
            error: "404: Page Not Found",
            message: "Page You're Requesting Seems Not To Exists in The Friends-API"
        })
    },
    error500: (err, req, res, next) => {
        res.status(500).json({
            error: "500: Internal Server Error",
            message: "Sever Seems To be Unresponsive, please try refresh the page. If Still you keep getting this error please email: christopherodhiambo254@gmail.com"
        })
    }
}