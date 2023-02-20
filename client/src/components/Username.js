import React from 'react';
import {Link, useNavigate}  from 'react-router-dom';
import avatar from '../assets/profile.png';
import Styles from '../styles/Username.module.css'
import {Toaster} from 'react-hot-toast';
import {useFormik} from 'formik'
import { usernameValidate } from '../helper/validate';
import { useAuthStore } from '../store/store';

export default function Username() {

  const navigate = useNavigate();

  const setUsername =   useAuthStore(state =>state.setUsername)
  //const username =   useAuthStore(state =>state.auth.username)

  // useEffect (() =>{
  //   console.log(username)
  // })
   const formik = useFormik({

     initialValues:{
      username : "balaji" 

  },
  validate: usernameValidate,
  validateOnBlur: false,
  validateOnChange: false,
  onSubmit: async values =>{
  
    setUsername(values.username); 
      navigate('/password')
  }
})
  return (
 
        //items-center
        <div className="container mx-auto">
          <Toaster position='top-center' reverseOrder={false}></Toaster>

          <div  className='flex justify-center items-center h-screen'>
             <div className={Styles.glass}>
                <div className='title flex flex-col items-center'>
                    <h4 className='text-5xl font-bold'> Hello Again!</h4>
                      <span className='py-4 text-xl w-2/3 text-center text-gray-500'>Explore more  by connecting with us 
                       </span>
                        </div>
                              <form className='py-1' onSubmit={formik.handleSubmit}>
                                       <div className='profile flex justify-center py-4'>
                                          <img src={avatar}  className={Styles.profile_img} alt='avatar'></img>
                                       </div>
                                     <div className='textbox flex flex-col items-center gap-6'>
                                           <input {...formik.getFieldProps('username')}type='text' className={Styles.textbox} placeholder='Username'></input>
                                           <button type='submit' className={Styles.btn}> Let's Go</button>
                                       </div>
                                       <div className='text-center py-4'>
                                        <span className='text-gray-500'>Not a member<Link className='text-red-500' to="/register">Register Now</Link></span>


                                       </div>


                                 </form>


                         </div>
                  </div>
       
    </div>
  )
}
