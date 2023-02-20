import React, { useState } from 'react';
import { useNavigate}  from 'react-router-dom';
import avatar from '../assets/profile.png';
import Styles from '../styles/Username.module.css'
import toast,{Toaster} from 'react-hot-toast';
import {useFormik} from 'formik';
import useFetch from '../hooks/fetch.hook';
import { profileValidation } from '../helper/validate';
import convertToBase64 from '../helper/convert';
import { useAuthStore } from '../store/store';
import { updateUser } from '../helper/helper';
//import Styles from '../styles/Username.module.css';
import extend from '../styles/profile.module.css'

export default function Profile() {

   const navigate = useNavigate();
   const [file,setFile] = useState();
   const [{isLoading, apiData, serverError}] = useFetch()

   const formik = useFormik({

     initialValues:{
      firstName: apiData?.firstname || '',
      lastName: apiData?.lastname || '',
      email:apiData?.email || '',
      mobile: apiData?.mobile ||"",
      address: apiData?.address ||"" 

  },
  enableReinitialize:true,
  validate: profileValidation,
  validateOnBlur: false,
  validateOnChange: false,
  onSubmit: async values =>{
    values= await Object.assign(values, {profile:file || apiData?.profile ||''})
    let updatePromise = updateUser(values);
    toast.promise(updatePromise, {
      loading: 'Updating...',
      success: <b>updated Successfully...!</b>,
      error: <b>could not update</b>
    });


 }
});

const onUpload = async e =>{
  const base64= await convertToBase64(e.target.files[0]);
  setFile(base64)
}

function userLogout(){
  localStorage.removeItem('token');
  navigate('/')
}

if(isLoading) return <h1  className='text-2xl font-bold'>is Loading</h1>
if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

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
                                          <img src={apiData?.profile || file || avatar}  className={Styles.profile_img} alt='avatar'></img>
                                        </label>
                                         <input onChange={onUpload} type="file" id='profile' name='profile'></input>
                                       </div>

                                     <div className='textbox flex flex-col items-center gap-6'>

                                       <div className="name flex w-3/4 gap-10">
                                       <input {...formik.getFieldProps('firstName')}type='text' className={`${Styles.textbox} ${extend.textbox}`} placeholder='First Name'></input>
                                       <input {...formik.getFieldProps('lastName')}type='text'className={`${Styles.textbox} ${extend.textbox}`} placeholder='Last Name'></input>
                                       </div>

                                       <div className="name flex w-3/4 gap-10">
                                       <input {...formik.getFieldProps('email')}type='text'className={`${Styles.textbox} ${extend.textbox}`} placeholder='Email*'></input>
                                       <input {...formik.getFieldProps('mobile')}type='text' className={`${Styles.textbox} ${extend.textbox}`} placeholder='Mobile number'></input>

                                       </div>

                                   
                                       <input {...formik.getFieldProps('address')}type='text' className={`${Styles.textbox} ${extend.textbox}`}  placeholder='Address'></input>
                                       <button type='submit' className={Styles.btn}>Update</button>
                                           {/* <input {...formik.getFieldProps('username')}type='text' className={Styles.textbox} placeholder='Username'></input>
                                           <input {...formik.getFieldProps('password')}type='password' className={Styles.textbox} placeholder='Password'></input> */}
                                      </div>
                                           
                               
                                       <div className='text-center py-4'>
                                        <span className='text-gray-500'>come back later<button onClick={userLogout} className='text-red-500' to="/">Logout</button></span>


                                       </div>


                                 </form>


                         </div>
                  </div>
       
    </div>
  );
}; 