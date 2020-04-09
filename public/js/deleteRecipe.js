const deleteRecipe = async (deleteId) =>{

      try{const res = await  axios({
          
            method: 'delete',
            url: 'http://127.0.0.1:8000/api/v1/recipe/'+deleteId
           
        });
        

        window.setTimeout(()=> {
            location.assign('/api/v1/view/myrecipes');
        }, 100);
    
    }catch(err){
        alert(err.response.data.message);
    }
    };
    
document.querySelector('.deleteRecipe').addEventListener('click', e => {
    document.getElementById("welcome").hidden = true;
    const deleteId = document.getElementById("welcome").innerHTML;
    e.preventDefault();
    deleteRecipe(deleteId);
});