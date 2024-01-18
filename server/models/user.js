const mongoose = require('mongoose');
const validator = require('validator');
const generateHash = require('./../utils/generateHash');



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
        const error = new Error("All fields are required");
        error.status = 400;
        throw error;
    }
    if(!validator.isEmail(email)) {
        const error = new Error("Please enter a valid email");
        error.status = 400;
        throw error;
    }
    try {
        const user = await this.findOne({email});
        if(user) {
            const error = new Error("User already exists");
            error.status = 400;
            throw error;
        }
    } catch(err) {
        throw Error("Error fetching user in database");
    }
    const hash = await generateHash(password);
    if(hash) {
        try {
            const user = await this.create({userName,email,password: hash});
            return user;
        } catch(err) {
            throw Error("Error creating user");
        }
    } else {
        throw Error("Error encrypting password");
    }
}

UserSchema.statics.login = async function (userDetails) {
    const {email,password} = userDetails;
    if(!email || !password) {
        const error = new Error("All fields are required");
        error.status = 400;
        throw error;
    }
    if(!validator.isEmail(email)) {
        const error = new Error("Please enter a valid email");
        error.status = 400;
        throw error;
    }
    try {
        const user = await this.findOne({email});
        if(!user) {
            const error = new Error("User doesnt exist");
            error.status = 404;
            throw error;
        }
        return user;  
    } catch(err) {
        throw Error("Error fetching user in database");
    } 
}


module.exports = mongoose.model('user',UserSchema);