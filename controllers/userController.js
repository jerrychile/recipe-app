const fs = require('fs');
const User = require('./../models/userModel')

exports.getAllUsers = async (req,res) => {
    const users = await User.find();
    // console.log(JSON.stringify(users));
    res.status(200).json({
        status:'success',
        data:{
            users
        }
    });
}

exports.getUser = async (res,req) =>{
    const user = await User.findById(req.params.userId);

    res.status(200).json({
        status:'success',
        data:{
            user
        }
    });
}

exports.createUser = async (req,res) =>{
    try{const newUser = await User.create(req.body);

    res.status(201).json({
        status: 'success',
        data:{
            user: newUser
        }
    })}catch(err){
        res.send({
            "message":err
        })
    }
}