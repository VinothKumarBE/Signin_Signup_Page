import React, { useState } from 'react';
import {Link, useNavigate}  from 'react-router-dom';
import avatar from '../assets/profile.png';
import Styles from '../styles/Username.module.css'
import  toast,{Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { registerValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import { registerUser } from '../helper/helper';


export default function Register() {
   
    const navigate = useNavigate()
    const [file,setFile] = useState()

   const formik = useFormik({

     initialValues:{
      email: "balaji123@gmail.com",
      username: "balaji",
      password: "Balaji@123" 

  },
  validate: registerValidation,
  validateOnBlur: false,
  validateOnChange: false,
  onSubmit : async values =>{
     values = await Object.assign(values, { profile: file || ''})
   let registerPromise = registerUser(values)
    toast.promise(registerPromise, {
    loading: 'Creating',
    success: <b>Register sucessfully...!</b>,
    error : <b>Could not  Register</b>

  });

  registerPromise.then(function(){ navigate('/')});
    
  }
});

const onUpload = async e =>{
  const base64= await convertToBase64(e.target.files[0]);
  setFile(base64)
}
  return (
 
        //items-center
        <div className="container mx-auto">
          <Toaster position='top-center' reverseOrder={false}></Toaster>

          <div  className='flex justify-center items-center h-screen'>
             <div className={Styles.glass} style={{width:"50%",height:"100%"}}>
                <div className='title flex flex-col items-center'>
                    <h4 className='text-3xl font-bold'> Register </h4>
                      <span className='py-4 text-xl w-2/3 text-center text-gray-500'>Happy to join you!
                       </span>
                        </div>
                              <form className='py-1' onSubmit={formik.handleSubmit}>
                                       <div className='profile flex justify-center py-4'>
                                        <label htmlFor='profile'>
                                          <img src={file || avatar}  className={Styles.profile_img} alt='avatar'></img>
                                        </label>
                                         <input onChange={onUpload} type="file" id='profile' name='profile'></input>
                                       </div>
                                     <div className='textbox flex flex-col items-center gap-6'>
                                           <input {...formik.getFieldProps('email')}type='text' className={Styles.textbox} placeholder='Email'></input>
                                           <input {...formik.getFieldProps('username')}type='text' className={Styles.textbox} placeholder='Username'></input>
                                           <input {...formik.getFieldProps('password')}type='password' className={Styles.textbox} placeholder='Password'></input>

                                           <button type='submit' className={Styles.btn}>Register</button>
                                       </div>
                                       <div className='text-center py-4'>
                                        <span className='text-gray-500'>Already Register<Link className='text-red-500' to="/">Login Now</Link></span>


                                       </div>


                                 </form>


                         </div>
                  </div>
       
    </div>
  );
};