const jwt = require("jsonwebtoken")
const secretKey = "12345678"

function generateToken(email){
    const token = jwt.sign({email},secretKey,{expiresIn: "1h"})
    return token;
}

module.exports = {generateToken}