import { Route, Routes } from 'react-router-dom'
import './App.css'
import Landing from "./views/Landing/Landing"
import Homepage from './views/Homepage/Homepage'
import Navbar from './components/Navbar/Navbar'

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Landing/>}/>
        <Route path='/home' element={<Homepage/>}/>

        
      </Routes>
    </>
  )
}

export default App
