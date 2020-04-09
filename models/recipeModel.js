const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    recipeName:{
        type:String,
        required:[true, 'Your recipe needs a name!'],
        maxLength: [128, 'You recipe cannot exceed 128 characters']
    },
    ingredients:[String],
    createdAt:{
        type:Date,
        default:Date.now 
    },
    instructions:{
        type:String
    },
    userId:{
        type:String
    },
    userName:String
    
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;