import { Routes, Route } from 'react-router-dom';
import Landing from './views/Landing/LandingPage';

import './App.css'
import { HomePage } from './views/HomePage'

function App() {


  return (
    
    <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/home' element={<HomePage/>}/>
      <Route path='/home/:id' element={''}/>
      <Route path='/create' element={''}/>
    </Routes>
  )
}

export default App
