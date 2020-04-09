const User = require('./../models/userModel');
const jwt = require('jsonwebtoken');
const AppError = require('./../util/appError');
const {promisify} = require('util');


const signToken = id => {
   return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createSendToken = (user, statusCode, res) =>{
    const token = signToken(user._id);

    res.cookie('jwt', token, {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
        httpOnly: true
    })

    res.status(statusCode).json({
        status:'success',
        token,
        data:{
            user
        }
    });
}

exports.signUp = async (req,res) =>{
   try{ 

       const newUser = await User.create({
       name: req.body.name,
       email: req.body.email,
       password: req.body.password,
       passwordConfirm: req.body.passwordConfirm
   });

const token = createSendToken(newUser, 201, res );

  // const token = signToken(newUser._id);

    // res.status(201).json({
    //     status:'success',
    //     token,
    //     data:{
    //         user: newUser
    //     }
    // });
}catch(err){
        console.log(err);
    }
} // end signUp 

exports.login = async (req,res,next) =>{
  try{  const {email, password} = req.body;

    // 1) Check if email and password exist

    if(!email || !password){
       return next(new AppError('Please provide email and password', 400));
    }

    // 2) Check if user exist and password is correct
    const user = await User.findOne({email}).select('+password');
    
    
    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new AppError('Incorrect email or password',401))
    }

    // 3) If everything is okay, send webtoken

const token = createSendToken(user, 201, res);

}catch(err){
        console.log(err);
    }
    
};


exports.logout = (req,res) =>{
    let dateNow = Date.now() + 10 * 1000;
    console.log(dateNow);
    res.cookie('jwt', 'loggedout',{
        
        httpOnly: true
    });
    res.status(200).json({status:'success'});
}

exports.protect = async (req,res,next)=>{
    try{
        let token;
        // 1) Getting token and check if its there
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }else if(req.cookies.jwt){
            token = req.cookies.jwt;
        }
        //console.log(token);

        if(!token){
            return next(new AppError('You are not logged in', 401));
        }

        // 2) Verification token
        try{
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        console.log(decoded)
        console.log(decoded.id);}catch(err){
            console.log(err)
        }

        // 3) Check if user still exists

        // 4) Check if user changed password after the JWT was issued

        next();


    }catch(err){

    }
};


