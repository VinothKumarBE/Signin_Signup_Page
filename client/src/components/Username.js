import React from 'react';
import {Link}  from 'react-router-dom';
import avatar from '../assets/profile.png';
import Styles from '../styles/Username.module.css'

export default function Username() {
  return (
 
        //items-center
        <div className="container mx-auto">

          <div  className='flex justify-center  h-screen'>
             <div className={Styles.glass}>
                <div className='title flex flex-col items-center'>
                    <h4 className='text-5xl font-blod'> Hello Again!</h4>
                      <span className='py-4 text-xl w-2/3 text-center text-gray-500'>Explore more  by connecting with us 
                       </span>
                        </div>
                              <form className='py-1'>
                                       <div className='profile flex justify-center py-4'>
                                          <img src={avatar}  className={Styles.profile_img} alt='avatar'></img>
                                       </div>
                                        <div className='textbox flex flex-col items-center gap-6'>
                                           <input type='text' className={Styles.textbox} placeholder='Username'></input>
                                           <button type='submit' className={Styles.btn}> Let's GO</button>
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