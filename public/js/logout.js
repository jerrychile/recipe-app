const logout = async () =>{
    try{
        console.log('This is from logout in login.js');
        const res = await axios({
            method:'GET',
            url: 'http://127.0.0.1:8000/api/v1/users/logout',
        });
        
        window.setTimeout(()=> {
            location.assign('/api/v1/view/login');
        }, 500);

    }catch(err){
        alert(err, 'Error logging out try again!');
    }
};


document.querySelector('.logout').addEventListener('click', e =>{
    e.preventDefault();
    logout();
    console.log('1');
});
