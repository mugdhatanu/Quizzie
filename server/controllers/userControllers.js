const User = require('./../models/user');
const generateToken = require('./../utils/generateToken');

const userForm = async(req,res,next,toRegister,msg) => {
    const {userName,password,email} = req.body;
    try {
        const user = toRegister ? await User.register({userName,password,email}): await User.login({email,password});
        const token = generateToken(user._id);
        res.status(201).json({msg, token});
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