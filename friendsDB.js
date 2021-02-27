require("dotenv/config")
const mongoose = require("mongoose")
const Friend = require("./models/Friend")

// @ MongoDB Setup.
mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// --> Database Connection. 
const db = mongoose.connection

db.on("error", console.error.bind("console", "Failed To Connect To MongoDB Database"))
db.once("open", () => {
    console.log("Connection To The MongoDb Database Was Successful..!")
})

// @ Create Friends
async function createFriend() {

    const friend = new Friend({
        name: "Am.Chris",
        location: "Bangladesh, Mombasa",
        phoneNumber: "0768879348",
        aboutFriend: "This is me, the JavaScript loving guy, humble, movie fan and everything. Chasing dreams since birth. All time favorite person and best friend.",
        status: "Complicated, 'Me, Myself And I '"
    })

    const savedFriend = await friend.save()
    db.close()
    console.log(savedFriend)
}
// createFriend()