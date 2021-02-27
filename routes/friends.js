const router = require("express").Router()
const mainControllers = require("../controllers/mainControllers")

router.get("/all", mainControllers.getAllFriends)

module.exports = router;