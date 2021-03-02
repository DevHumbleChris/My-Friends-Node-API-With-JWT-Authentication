const router = require("express").Router()
const mainControllers = require("../controllers/mainControllers")
// const token = require("../authenticate")

router.get("/all", mainControllers.getAllFriends)

router.post("/new", mainControllers.newFriend)

router.put("/update/:id", mainControllers.updateFriend)

router.delete("/remove/:id", mainControllers.deleteFriend)

router.get("/info/:id", mainControllers.getFriendInfo)

module.exports = router;