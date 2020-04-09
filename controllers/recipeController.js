const Recipe = require('./../models/recipeModel');
const User = require('./../models/userModel');
const {promisify} = require('util');
const jwt = require('jsonwebtoken');

exports.createRecipe = async (req,res,next) => {
   try{ 
       
    let token;
    let decoded;

    if(req.cookies.jwt){
        token = req.cookies.jwt;
    }
    
    if(!token){
        return next(new AppError('You are not logged in', 401));
    }

    try{
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    // console.log(decoded)
    // console.log(decoded.id);
}catch(err){
        // console.log(err)
    }
const userName = await User.findOne({_id:decoded.id});

// console.log("Here is our username");
// console.log(userName);

    const newRecipe = await Recipe.create({
        recipeName: req.body.recipeName,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        userId: decoded.id,
        userName: userName.name
        // add Created By field with user id with JWT

    })
    res.status(200).json({
        status:'succes',
        data:{
            newRecipe
        }
    })
    ;}catch(err){
        // console.log(err);
    }
};

exports.deleteRecipe = async(req,res) =>{
try{
const recipe = await Recipe.remove({_id:req.params.id});

    res.status(204).json({
        status:'success' 
    })
}catch(err){
    // console.log(err);
}

};

exports.updateRecipe = async(req,res) => {
// try{
//     const recipe = await Recipe.updateOne({_id:req.params.id},{$set:{}})
// }
try{
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.status(200).json({
        status:'updated',
        data:{
            recipe
        }
    })

}catch(err){
    // console.log(err);
}
};

exports.getAllRecipes = async(req,res) => {
  try{  
      
    let token;
    let decoded;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1];
    }
    
    if(!token){
        return next(new AppError('You are not logged in', 401));
    }

    try{
    decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    }catch(err){
        // console.log(err)
    }
    
    
    const recipes= await Recipe.find({userId:decoded.id});

    res.status(200).json({
        status:'success',
        data:{
            recipes
        }
    })}catch(err){
        res.status(401).json({
            status:'error',
            message:'You do not have any recipes saved!!'
        });
    }
};

exports.getRecipe = async(req,res) => {
    try{
        
        const recipe = await Recipe.findById(req.params.id);

    res.status(200).json({
        status:'success',
        data:{
            recipe
        }
    })}catch(err){
        // console.log(err);
    }
}
