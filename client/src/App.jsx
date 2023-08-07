import './App.css';
import React from 'react';
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

        <Route path='/login' element={<LoginSignin/>}/>
        <Route path='/signin' element={<SignInView/>}/>
        <Route path='/rooms/:id' element={<DetailPost/>}/>
        <Route path='/users/:user_id' element={<DetailUser/>}/>
        <Route path='/privacy&termns' element={<FooterLinks/>}/>
        <Route path='/post' element={<Post/>}/>  
         
      </Routes>
    </div>
  )
}

export default App
