import React from 'react'
import {createBrowserRouter, RouterProvider } from 'react-router-dom';

//import all components

import Username from './components/Username';
import Password from './components/Password';
import Recovery from './components/Recovery';
import PageNotFound from './components/PageNotFound';
import Reset from './components/Reset';
import Profile from './components/Profile';
import Register from './components/Register';


const  router =  createBrowserRouter([
    {
        path: '/',
        element :<Username></Username>

    },
    {
        path:'/register',
        element: <Register></Register>
    },
    {
        path:'/password',
        element: <Password></Password>
    },
    {
        path:'/profile',
        element: <Profile></Profile>
    },
    {
        path:'/recovery',
        element: <Recovery></Recovery>
    },
    {
        path:'/reset',
        element: <Reset></Reset>
    },
    {
        path:'*',
        element: <PageNotFound></PageNotFound>
    },

])


export default function App() {
  return (
    // <h1 className="text-3xl font-bold underline">
    //    Hello world!
    // </h1>\

    <main>

        <RouterProvider  router={ router}></RouterProvider>
    </main>
  )
}
