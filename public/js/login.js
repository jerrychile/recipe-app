const login = async (email,password) =>{
    console.log(email,password);
  try{const res = await axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/api/v1/users/login?',
        data: {
            email,
            password
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


document.querySelector('.form1').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('Email').value;
    const password = document.getElementById('Password').value;
    login(email,password);
});

