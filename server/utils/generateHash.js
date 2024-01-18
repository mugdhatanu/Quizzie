const bcrypt = require('bcrypt');


const generateHash = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        try {
            const hash = await bcrypt.hash(password,salt);
            return hash;
        } catch(err) {
            return null;
        }
    } catch(err) {
        return null;
    } 
}

module.exports = generateHash;