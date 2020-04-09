const Recipe = require('../models/recipeModel');
const User = require('../models/userModel');
const {promisify} = require('util');
const jwt = require('jsonwebtoken');

exports.getAllRecipes = async (req,res) =>{
    // get recipe data from collection
    try{const recipes = await Recipe.find();
    
    // build template

    // render that template using tour data from 1


    res.status(200).render('overview',{
        recipes
    });}catch(err){
        res.status(401).json({
            status:'error',
            message: err
        })
    }
};


exports.allRecipes = async (req,res) =>{
    // get recipe data from collection
    try{ const recipe = await Recipe.findOne({_id:req.params.id});
    // console.log("This is the recipe");
//  console.log(recipe);

    res.status(200).render('recipeMainPage',{
        title:'Pizza',
        recipe
    });}catch(err){
        res.status(401).json({
            status:'error',
            message: err
        })
    }
};


exports.getMyRecipes = async (req,res) =>{
    try{  
        // console.log("hello 1");
        let token;
        let decoded;
    
        if(req.cookies.jwt){
            token = req.cookies.jwt;
            // console.log(token);
        }
        // console.log('Hello hidden')
        if(!token){
            return next(new AppError('You are not logged in', 401));
        }
        // console.log('Hello 2')
        
        try{
        decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        req.user = decoded.id;
        }catch(err){
            // console.log(err)
        }
        // console.log('Hello 3')
       
        const recipes= await Recipe.find({userId:decoded.id});
        
    
        res.status(200).render('myRecipe',{
            recipes
        })}catch(err){
            res.status(401).json({
                status:'error',
                message:'You do not have any recipes saved!!',
                
            });
        }
};


exports.getRecipe= async(req,res) =>{

   try{ const recipe = await Recipe.findOne({_id:req.params.id});
    // console.log("This is the recipe");
    // console.log(recipe);

    res.status(200).render('recipe',{
        title:'Pizza',
        recipe
    });}catch(err){
        res.status(401).json({
            status:'error',
            message: err
        })
    }
};

exports.createRecipe= (req,res) =>{
    try{
        res.status(200).render('createRecipe',{
            title: 'Create a recipe'
        });
    }catch(err){
        console.log(err);
    }
};

exports.getLoginForm = (req,res) => {
    try{res.status(200).render('login', {
        title: 'Log into your account'
    });


}catch(err){
        res.status(401).json({
            status:'error',
            message: err
        });
    }// end catch
} // end getLoginForm


exports.getRegisterForm = (req,res) => {
    try{res.status(200).render('register', {
        title: 'Register!'
    });


}catch(err){
        res.status(401).json({
            status:'error',
            message: err
        });
    }// end catch
} // end getRegisterForm





