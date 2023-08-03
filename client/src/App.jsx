import { Route, Routes } from 'react-router-dom'
import Landing from "./views/Landing/Landing"
import Homepage from './views/Homepage/Homepage'
import Navbar from './components/Navbar/Navbar'
import Login from "./components/Navbar/User/Login/Login"
import SignIn from "./components/Navbar/User/SignIn/SignIn"
import DetailPost from "./views/Detail/DetailPost/DetailPost"
import DetailUser from "./views/Detail/DetaiUser/DetailUser"

import { useLocation } from 'react-router-dom'

// import './App.css'

function App() {

  const location = useLocation();

  return (
    <div>
      {
        location.pathname !== '/' ? <Navbar/> : null
      }
      
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Homepage/>}/>

        <Route path='/login' element={<Login/>}/>
        <Route path='/signin' element={<SignIn/>}/> 

        <Route path='/rooms' element={<DetailPost/>}/>
        <Route path='/user' element={<DetailUser/>}/>     
      </Routes>
    </div>
  )
}

export default App
