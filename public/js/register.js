const signUp = async (name,email,password,passwordConfirm) =>{
    console.log(email,password);
  try{const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/v1/users/signup?',
        data: {
            name,
            email,
            password,
            passwordConfirm
        }
    });


if(res.data.status === 'success'){
    window.setTimeout(()=> {
        location.assign('/api/v1/view/getallrecipes');
    }, 500);
}

    console.log(res);
}catch(err){
    alert(err.response.data.message);
}
};


document.querySelector('.form2').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('Name').value;
    const email = document.getElementById('Email').value;
    const password = document.getElementById('Password').value;
    const passwordConfirm = document.getElementById('PasswordConfirm').value;
    signUp(name,email,password,passwordConfirm);
});

