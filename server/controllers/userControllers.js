const User = require('./../models/user');
const generateToken = require('./../utils/generateToken');
const tokenExpiry = require('./../utils/tokenExpiry');

const userForm = async(req,res,next,toRegister,msg) => {
    const {name: userName,password,email} = req.body;
    try {
        const user = toRegister ? await User.register({userName,password,email}): await User.login({email,password});
        const token = generateToken(user._id);
        const expiry = tokenExpiry(token);
        res.status(201).json({msg, token, exp: expiry});
    } catch(err) {
        next(err);
    }
}

const register = async (req,res,next) => {
    userForm(req,res,next,true,'User registered successfully');
}

const login = async (req,res,next) => {
    userForm(req,res,next,false,'User logged in successfully');
}




module.exports = {register, login}