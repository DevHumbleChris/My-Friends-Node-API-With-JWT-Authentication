const router = require("express").Router()
const mainControllers = require("../controllers/mainControllers")

// @ Register User.
router.post("/register", mainControllers.registerUser)

router.post("/login", mainControllers.login)

module.exports = router;