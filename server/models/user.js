const mongoose = require('mongoose');
const validator = require('validator');
const {generateHash,verifyPassword} = require('../utils/encryptPassword');



const Schema = mongoose.Schema;
const UserSchema = new Schema({
    _id: {type: mongoose.Schema.Types.ObjectId, auto: true},
    userName: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
},{timestamps: true});


UserSchema.statics.register = async function (userDetails) {
    const {userName, email,password} = userDetails;
    if(!userName || !email || !password) {
        const error = new Error();
        error.msg = "All fields are required";
        error.status = 400;
        throw error;
    }
    if(!validator.isEmail(email)) {
        const error = new Error();
        error.msg = "Please enter a valid email";
        error.status = 400;
        throw error;
    }
    try {
        const user = await this.findOne({email});
        if(user) {
            const error = new Error();
            error.msg = "User already exists";
            error.status = 400;
            throw error;
        }
    } catch(err) {
        throw Error(err.msg);
    }
    const hash = await generateHash(password);
    if(hash) {
        try {
            const user = await this.create({userName,email,password: hash});
            return user;
        } catch(err) {
            throw Error(err.msg);
        }
    } else {
        throw Error(err.msg);
    }
}

UserSchema.statics.login = async function (userDetails) {
    const {email,password} = userDetails;
    if(!email || !password) {
        const error = new Error();
        error.msg = "All fields are required";
        error.status = 400;
        throw error;
    }
    if(!validator.isEmail(email)) {
        const error = new Error();
        error.status = 400;
        error.msg = "Please enter a valid email";
        throw error;
    }
    try {
        const user = await this.findOne({email});
        if(!user) {
            const error = new Error();
            error.status = 404;
            error.msg = "User doesnt't exist";
            throw error;
        }
        const verify = await verifyPassword(password,user.password);
        if(verify) {
            return user;
        } else {
            const error = new Error();
            error.status = 400;
            error.msg = "Incorrect Password"
            throw error;
        }
    } catch(err) {
        throw Error(err.msg);
    } 
}


module.exports = mongoose.model('User',UserSchema);