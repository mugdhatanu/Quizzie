const jwt = require('jsonwebtoken');



const tokenExpiry = (token) => {
    const {exp} = jwt.decode(token);
    return new Date(exp*1000);
}

module.exports = tokenExpiry;