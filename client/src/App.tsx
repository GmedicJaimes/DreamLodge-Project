import { Routes, Route } from 'react-router-dom';
import Landing from './views/Landing/LandingPage';

import { HomePage } from './views/Home/HomePage';
import './App.css'

const App = (): JSX.Element => {
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
