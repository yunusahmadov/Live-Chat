import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import Input from './Input'

function Login() {
    const login=useSelector(state=>state.Data.login)
    const navigate=useNavigate()
    function goToRegister() {
      navigate('/register')
    } 
  return (
    <div className='register-cont'>
    <form action="login">
        <p>Login</p>
        <div className="input-container">
        <Input  placeholder={'Email'} name="login.email" type={'text'} value={login.email} />
        <Input  placeholder={'Password'} name="login.password" type={'text'} value={login.password} />
        </div>
       
        <div className="button-cont">
        <Button data={login} url="login" text="Log In"/>
        <button onClick={goToRegister}>Register</button>
        </div>

    </form>
    </div>
  )
}

export default Login