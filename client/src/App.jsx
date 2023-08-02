import { Route, Routes } from 'react-router-dom'
import './App.css'
import Landing from "./components/views/Landing/Landing"
import Homepage from './components/Homepage/Homepage'
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
