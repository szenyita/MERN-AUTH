const jwt = require("jsonwebtoken")
const User = require("../Models/userModel")

const requireAuth = async (req, res, next) => {
    const {authorization} = req.headers
    if (!authorization) {
        return res.status(401).json({error: "Authorization token required"})
    }

    const token = authorization.split(" ")[1]
    try {
        const id = jwt.verify(token, process.env.SECRET)
        req.headers = await User.findById(id).select("_id")
        next()
    } catch (error) {
        res.status(401).json({error: "Unauthorized request"})
    }
}

module.exports = requireAuth