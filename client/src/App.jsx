import { Route, Routes } from 'react-router-dom'
import Landing from "./views/Landing/Landing"
import Homepage from './views/Homepage/Homepage'
import Navbar from './components/Navbar/Navbar'

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

        
      </Routes>
    </div>
  )
}

export default App
