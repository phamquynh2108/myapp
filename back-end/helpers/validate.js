module.exports.checkEmail = (email)=> {
    const regexEmail=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    if(email.match(regexEmail)){
        return true;
    }else{
        return false;
    }

}

module.exports.checkPassword = (password) => {
    //Minimum eight characters, at least one letter and one number
    const regexPassword=/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/
    if(password.match(regexPassword)){
        return true;
    }else{
        return false;
    }

}