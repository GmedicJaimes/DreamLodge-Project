import './App.css';
import React, { useState} from "react";
import { Route, Routes } from 'react-router-dom'
import Landing from "./views/Landing/Landing"
import Homepage from './views/Homepage/Homepage'
import Navbar from './components/Navbar/Navbar'
import DetailPost from "./views/Detail/DetailPost/DetailPost"
import DetailUser from "./views/Detail/DetaiUser/DetailUser"
import Post from './views/Post/Post';
import { useLocation } from 'react-router-dom'
import { LoginSignin } from './views/LoginSignin/LoginSignin'
import { SignInView } from './views/signing/SignInView';
import { FooterLinks } from './views/FooterLinks/FooterLinks';
import Reserve from './views/Reserve/Reserve';
import UserEditProperty from './views/UserEditProperty/UserEditProperty';
import EditUser from "./views/EditUser/EditUser"
import AceptedPay from './views/AceptedPay/AceptedPay';
import TutorialPost from './views/TutorialPost/TutorialPost';

function App() {

  const location = useLocation();



  return (
    <div className="App">
      {
        location.pathname !== '/' ? <Navbar/> : null
      }
      
      <Routes>  
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Homepage/>}/>
        <Route path='/reserve/:id' element={<Reserve/>}/>
        <Route path='/login' element={<LoginSignin/>}/>
        <Route path='/signin' element={<SignInView/>}/>
        <Route path='/rooms/:id' element={<DetailPost/>}/>
        <Route path='/user/:id' element={<DetailUser/>}/>
        <Route path='/privacy&termns' element={<FooterLinks/>}/>
        <Route path='/editpr/:id' element={<UserEditProperty/>}/>
        <Route path='/config/:id' element={<EditUser/>}/>
        <Route path='/post' element={<Post/>}/>  
        <Route path='/nice' element={<AceptedPay/>}/>
        <Route path='/tutorial' element={<TutorialPost/>}/>
      </Routes>
    </div>
  )
}

export default App
