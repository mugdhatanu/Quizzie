const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
    const token = jwt.sign({userId},process.env.SECRET,{expiresIn: "2h"});
    return token;
}

module.exports = generateToken