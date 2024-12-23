function Validation(values){
    let error = {};
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/

    if(values.name === ""){
        error.name = "Name should not be empty";
    }
    

    if(values.email === ""){
        error.email = "Email should not be empty";
    }
    else if(!email_pattern.test(values.email)){
        error.email = "Email didnt match";
    }

    if(values.password === ""){
        error.password = "Password should not be empty";
    }
    else if(!password_pattern.test(values.password)){
        error.password = "Password should contain capital letter, numbers";
    }
    
    return error;
}

export default Validation;