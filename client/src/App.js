import React from 'react'
import {BrowserRouter, Route , Routes} from 'react-router-dom'
import Contacts from './Pages/Contacts'
import LoginPage from './Pages/LoginPage'
import RegisterPage from './Pages/RegisterPage'
import UserPage from './Pages/UserPage'



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<LoginPage/>} />
      <Route path='/register' element={<RegisterPage/>} />
      <Route path='/user/:id' element={<UserPage/>} />
      <Route path='/all-contacts' element={<Contacts/>} />

    </Routes>
  </BrowserRouter>
  )
}

export default App
