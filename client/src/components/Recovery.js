import React from 'react';
import {Link}  from 'react-router-dom';
import avatar from '../assets/profile.png';
import Styles from '../styles/Username.module.css'
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik'
import { passwordValidate } from '../helper/validate';

export default function Recovery() {


   const formik = useFormik({

     initialValues:{
      recovery : "" 

  },
  validate: passwordValidate,
  validateOnBlur: false,
  validateOnChange: false,
  onSubmit: async values =>{
    console.log(values);
  }
})
  return (
 
        //items-center
        <div className="container mx-auto">
          <Toaster position='top-center' reverseOrder={false}></Toaster>

          <div  className='flex justify-center items-center h-screen'>
             <div className={Styles.glass}>
                <div className='title flex flex-col items-center'>
                    <h4 className='text-5xl font-bold'>Recovery</h4>
                      <span className='py-4 text-xl w-2/3 text-center text-gray-500'>Enter the OTP to recover password
                       </span>
                        </div>
                              <form className='pt-20' onSubmit={formik.handleSubmit}>
                                       
                                     <div className='textbox flex flex-col items-center gap-6'>
                                      <div className="input text-center">
                                        <span className='py-4 text-sm text-left text-gray-500'> Enter the 6 digit otp sent  to your email address</span>
                                           <input {...formik.getFieldProps('recovery')}type='password' className={Styles.textbox} placeholder='Password'></input>
                                          
                                       </div>
                                       <button type='submit' className={Styles.btn}>Sign In</button>
                                      </div>
                                      
                                       <div className='text-center py-4'>
                                        <span className='text-gray-500'>Can not get otp?<button className='text-red-500'>Resend</button></span>


                                       </div>


                                 </form>


                         </div>
                  </div>
       
    </div>
  )
};