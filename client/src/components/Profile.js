import React, { useState } from 'react';
import {Link}  from 'react-router-dom';
import avatar from '../assets/profile.png';
import Styles from '../styles/Username.module.css'
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import { profileValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
//import Styles from '../styles/Username.module.css';
import extend from '../styles/profile.module.css'

export default function Profile() {
   const [file,setFile] = useState()

   const formik = useFormik({

     initialValues:{
      firstname: "",
      lastname: "",
      email: "",
      mobile: "",
      address: "" 

  },
  validate: profileValidation,
  validateOnBlur: false,
  validateOnChange: false,
  onSubmit: async values =>{
    values= await Object.assign(values, {profile:file || ''})
    console.log(values);
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
             <div className={`${Styles.glass} ${extend.glass}`} style={{width:"50%",height:"110%"}}>
                <div className='title flex flex-col items-center'>
                    <h4 className='text-5xl font-bold'> profile </h4>
                      <span className='py-4 text-xl w-2/3 text-center text-gray-500'>you can update the details
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

                                       <div className="name flex w-3/4 gap-10">
                                       <input {...formik.getFieldProps('firstname')}type='text' className={`${Styles.textbox} ${extend.textbox}`} placeholder='First Name'></input>
                                       <input {...formik.getFieldProps('lastname')}type='text'className={`${Styles.textbox} ${extend.textbox}`} placeholder='Last Name'></input>
                                       </div>

                                       <div className="name flex w-3/4 gap-10">
                                       <input {...formik.getFieldProps('email')}type='text'className={`${Styles.textbox} ${extend.textbox}`} placeholder='Email*'></input>
                                       <input {...formik.getFieldProps('mobile')}type='text' className={`${Styles.textbox} ${extend.textbox}`} placeholder='Mobile number'></input>

                                       </div>

                                   
                                       <input {...formik.getFieldProps('address')}type='text' className={`${Styles.textbox} ${extend.textbox}`}  placeholder='Address'></input>
                                       <button type='submit' className={Styles.btn}>Register</button>
                                           {/* <input {...formik.getFieldProps('username')}type='text' className={Styles.textbox} placeholder='Username'></input>
                                           <input {...formik.getFieldProps('password')}type='password' className={Styles.textbox} placeholder='Password'></input> */}
                                      </div>
                                           
                               
                                       <div className='text-center py-4'>
                                        <span className='text-gray-500'>come back later<Link className='text-red-500' to="/">Log out</Link></span>


                                       </div>


                                 </form>


                         </div>
                  </div>
       
    </div>
  );
}; 