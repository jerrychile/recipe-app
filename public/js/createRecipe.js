const createRecipe = async (recipeName, ingredients, instructions) =>{
let ingredientss = ingredients.split(',');
console.log(ingredients);

  try{const res = await  axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/v1/recipe/',
        data: {
            recipeName,
            ingredients: ingredientss,
            instructions
        }
    });



    window.setTimeout(()=> {
        location.assign('/api/v1/view/myrecipes');
    }, 500);


    //console.log(res);
}catch(err){
    alert(err.response.data.message);
}
};


document.querySelector('.form').addEventListener('submit', e => {
    e.preventDefault();
    const recipe = document.getElementById('recipename').value;
    console.log('Here is the recipe', recipe);
    const ingredientss = document.getElementById('ingredients').value;
    const instructionss = document.getElementById('instructions').value;
    createRecipe(recipe,ingredientss, instructionss);
});
