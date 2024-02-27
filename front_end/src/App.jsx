import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './assets/pages/Home'
import Login from './assets/pages/Login.jsx'
import Register from './assets/pages/Register.jsx'
import Deployed from './assets/pages/Deployed.jsx'
import PullOut from './assets/pages/PullOut.jsx'
import Rebuild from './assets/pages/Rebuild.jsx'
const App = () => {
  return (
   <>
   <Routes>
    <Route path='/' element={<Home />}></Route>
    <Route path='/register' element={<Register/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/deployed' element={<Deployed/>}></Route>
    <Route path='/pull-out' element= {<PullOut/>}></Route>\
    <Route path='/rebuild' element= {<Rebuild/>}></Route>
   </Routes>
   </>
  )
}

export default App
