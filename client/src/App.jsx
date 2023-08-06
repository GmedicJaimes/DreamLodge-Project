import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Landing from "./views/Landing/Landing"
import Homepage from './views/Homepage/Homepage'
import Navbar from './components/Navbar/Navbar'
import DetailPost from "./views/Detail/DetailPost/DetailPost"
import DetailUser from "./views/Detail/DetaiUser/DetailUser"
import  {Post}  from './views/Post/Post';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useLocation } from 'react-router-dom'
import { LoginSignin } from './views/LoginSignin/LoginSignin'
import { SignInView } from './views/signing/SignInView';

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
        <Route path='/user/:id' element={<DetailUser/>}/>
        <Route path='/post' element={<Post/>}/>  
         
      </Routes>
    </div>
  )
}

export default App
