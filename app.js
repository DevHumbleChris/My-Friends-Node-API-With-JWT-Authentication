require("dotenv/config")
const express = require("express")
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const friendsRoute = require("./routes/friends")

const app = express()
const PORT = process.env.PORT ?? 3000

// @ MongoDB Setup. 
mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})

// --> Database Connection. 
const db = mongoose.connection
db.on("error", console.error.bind("console", "Connection To The MongoDB Failed...!"))
db.once("open", () => {
    console.log("Connection To The MongoDb Was Successful...!")
})

// --> Middlewares.

// @ Application/JSON Body-Parser. 
app.use(express.json())

// @ Importing Routes. 
app.use("/api/user", authRoute)
app.use("/api/friend", friendsRoute)

app.listen(PORT, () => {
    console.log("friends-api Server Up And Running")
})