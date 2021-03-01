const mongoose = require("mongoose")

const friendSchema = new mongoose.Schema({
    name: {
        type: String,
        max: 255,
        required: true
    },
    location: {
        type: String,
        max: 30,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        max: 13
    },
    aboutFriend: {
        type: String,
        required: true,
        min: 30
    },
    status: {
        type: String,
        required: true,
        max: 50
    }
})

module.exports = mongoose.model("Friend", friendSchema)