const jwt = require("jsonwebtoken")

module.exports = {
    authenticateToken: (req, res, next) => {
        const token = req.header("auth-token")
        if(!token) res.status(400).send("Access Denied...!")

        const verifiedUSer = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = verifiedUser
        next()
    }
}