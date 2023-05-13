import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Button from './Button'
import Input from './Input'

function Register() {
    const register=useSelector(state=>state.Data.register)
    const navigate=useNavigate()
    function goToLogin() {
      navigate('/')
    } 

  return (
    // <div className='register-cont'>
    //     <form action="login">
    //         Register
    //         <Input  placeholder={'Name'} name="register.name" type={'text'} value={register.name} />
    //         <Input  placeholder={'Email'} name="register.email" type={'text'} value={register.emamil} />
    //         <Input  placeholder={'Password'} name="register.password" type={'text'} value={register.password} />
    //         <Button data={register} url="register" text="Register"/>
    //         <button onClick={goToLogin}>Login</button>

    //     </form>
    // </div>
    <section className='reg'>
    <div className='register-cont'>
    <form action="login">
        <p>Register</p>
        <div className="input-container">
        <Input  placeholder={'Name'} name="register.name" type={'text'} value={register.name} />
        <Input  placeholder={'Email'} name="register.email" type={'text'} value={register.emamil} />
        <Input  placeholder={'Password'} name="register.password" type={'text'} value={register.password} />
        </div>
       
        <div className="button-cont">
        <Button data={register} url="register" text="Register"/>
        <button onClick={goToLogin}>Login</button>
        </div>

    </form>
    </div>
    </section>

  )
}

export default Register