const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required: [true, "You need to have a name! Doesn't have to be your real name"]
    },
    email:{
        type:String,
        required: [true, "You need to have an email"],
        unique: true,
        lowercase:true,
        validate:[validator.isEmail, "Please enter a valid email"]
    },
    role:{
        type:String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    password:{
        type: String,
        required: [true,"Please enter a password"],
        minlength: 8,
        select: false
    },
    passwordConfirm:{
        type:String,
        required:[true, "Please confirm your password"],
        validate:{
            validator: function(el){
                return el === this.password // this only works on Save
            },
            message:'Passwords are not the same'
        }
    }
});

// pre save or document middleware  enters his password -> userSchema -> database

userSchema.pre('save', async function(next){  // happens between we recieved the data and save it to the DB || Encrypts the password
    if(!this.isModified('password')) return next();  // this refers to current user/document only run if password was modified

    // hash the password || encrypt it
    this.password = await bcrypt.hash(this.password, 12); // 12 is the salt aka how well it is encrpyed

    this.passwordConfirm = undefined; 
    next();
}); 

// instance method

userSchema.methods.correctPassword = async function(candidatePassword, userPassword){
    return await bcrypt.compare(candidatePassword, userPassword);
}

const User = mongoose.model('User', userSchema);

module.exports = User;