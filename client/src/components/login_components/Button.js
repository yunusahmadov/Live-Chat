import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { loginUser, registerUser } from '../../actions/MainAction';


function Button({text,data,url}) {
    const navigate=useNavigate();
    const dispatch=useDispatch();

    function loginRegisterBtn(e) {
        console.log(url)
        e.preventDefault()
        let permission=true;
        for (const property in data) {
          if (data[property] == '') {
            permission = false
          }
        }
        if (permission) {
          if (url=='register') {
            dispatch(registerUser(data))
          }else if (url=='login') {
            console.log('salam')
            dispatch(loginUser(data))
            .then(resp=>{
              if (resp=='success') {
                navigate('/all-contacts')
              }else{
                const Toast = Swal.mixin({
                  toast: true,
                  position: 'top-end',
                  showConfirmButton: false,
                  timer: 3000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                  }
                })
                
                Toast.fire({
                  icon: 'error',
                  title: 'Invalid '
                })
              }
            })
          }
        }else{
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'error',
            title: 'All fields are required.'
          })
        }
      }

    
  return (
    <button onClick={(e)=>loginRegisterBtn(e)}>{text}</button>
  )
}

export default Button