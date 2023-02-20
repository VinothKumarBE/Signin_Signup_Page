import toast from 'react-hot-toast';
import  {authenticate} from './helper';
//username validate

export async function usernameValidate(values){
    const errors = usernameVerify({}, values);
     if(values.username){

        const { status } = await authenticate(values.username);

        if( status!==200){
            errors.exist = toast.error('User does not  exist..!')
        }

     }
     return errors;
}


//password validate
export async function passwordValidate(values){
    const errors = passwordVerify({}, values);

    return errors ;
}

//reset  validate 
export async function resetPasswordValidation(values){
    const errors = passwordVerify({}, values);

    if(values.password !== values.confirm_pwd){
        errors.exits =toast.error("password not match")
    }
    return errors;
}

// validate register form
export async function registerValidation(values){
    const  errors =usernameVerify({}, values);
    passwordVerify(errors, values);
    emailVerify(errors, values);
    return errors;
}

// validate profile page

export  async function profileValidation(values){
    const errors = emailVerify({}, values)
    return errors;
}
//password validate function
function passwordVerify(errors = {}, values){

const specialCharecters = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const upperCaseLetter = /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/;
const numerical = /[1234567890]/;

    if(!values.password){
        errors.password = toast.error("password Required...!")
    }else if (values.password.includes(" ")){
        errors.password = toast.error("wrong password...!");
    }else if (values.password.length<4){
        errors.password = toast.error("Password must should be more than  4 char");
    }else if(!specialCharecters.test(values.password)){
        errors.password = toast.error("Password must have a special charecter"); 
    }else if(!upperCaseLetter.test(values.password)){
        errors.password = toast.error("Password must have one upper case letter"); 
    }else if(!numerical.test(values.password)){
        errors.password = toast.error("Password must have one numerical value"); 
    }
    return errors;
}




//username validate function
function usernameVerify(error = {}, values){
    if(!values.username){
        error.username = toast.error('Username Required..!');
        
    } else if(values.username.includes(" ")){
        error.username = toast.error('InvalidUsername...!')
    }
    return error;


}

//email validation function

function emailVerify(error ={},values){
    if(!values.email){
       error.email = toast.error("Email Required...!");

    } 
    else if(values.email.includes(" ")){
        error.email= toast.error("Wrong Email...!")
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.email = toast.error("Invalid email address..!")
    }
    return error;
}