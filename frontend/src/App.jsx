import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Auth/Login'
import Signup from './components/Auth/Signup'
import Dashboard from './pages/Dashboard/Dashboard'
import {Toaster} from 'react-hot-toast'

const App = () => {
  return (
    <div>
  <Routes>
    <Route  path='/' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>} />
    <Route path='/dashboard/*' element={<Dashboard/>} />
  </Routes>
  <Toaster />
    </div>
  )
}

export default App