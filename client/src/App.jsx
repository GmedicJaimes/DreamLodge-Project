import './App.css';
import { Route, Routes } from 'react-router-dom'
import Landing from "./views/Landing/Landing"
import Homepage from './views/Homepage/Homepage'
import Navbar from './components/Navbar/Navbar'
import DetailPost from "./views/Detail/DetailPost/DetailPost"
import DetailUser from "./views/Detail/DetaiUser/DetailUser"

import { useLocation } from 'react-router-dom'
import { LoginSignin } from './views/LoginSignin/LoginSignin'


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

        <Route path='/users/:user_id/properties/:property_id' element={<DetailPost/>}/>
        <Route path='/user' element={<DetailUser/>}/>     
      </Routes>
    </div>
  )
}

export default App
