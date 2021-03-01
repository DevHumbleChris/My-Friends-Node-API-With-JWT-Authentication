const router = require("express").Router()
const mainControllers = require("../controllers/mainControllers")

router.get("/all", mainControllers.getAllFriends)

router.post("/new", mainControllers.newFriend)

router.put("/update/:id", mainControllers.updateFriend)

module.exports = router;