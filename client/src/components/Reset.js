import React from 'react';
import {Link}  from 'react-router-dom';
//import avatar from '../assets/profile.png';
import Styles from '../styles/Username.module.css'
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik'
import { resetPasswordValidation } from '../helper/validate';

export default function Reset() {


   const formik = useFormik({

     initialValues:{
      password : "" ,
      confirm_pwd: ""

  },
  validate: resetPasswordValidation,
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
             <div className={Styles.glass} style={{width: "50%"}}>
                <div className='title flex flex-col items-center'>
                    <h4 className='text-5xl font-bold'>Reset</h4>
                      <span className='py-4 text-xl w-2/3 text-center text-gray-500'>Enter new password 
                       </span>
                        </div>
                              <form className='py-20' onSubmit={formik.handleSubmit}>

                                     <div className='textbox flex flex-col items-center gap-6'>
                                           <input {...formik.getFieldProps('password')}type='password' className={Styles.textbox} placeholder='New Password'></input>
                                           <input {...formik.getFieldProps('confirm_pwd')}type='password' className={Styles.textbox} placeholder='Repeat Password'></input>

                                           <button type='submit' className={Styles.btn}>Reset</button>
                                       </div>
                                       <div className='text-center py-4'>
                                        <span className='text-gray-500'>Forgot Password?<Link className='text-red-500' to="/recovery">Recover Now</Link></span>


                                       </div>


                                 </form>


                         </div>
                  </div>
       
    </div>
  )
}
