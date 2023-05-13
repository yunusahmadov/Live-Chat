import React from 'react'
import { useDispatch } from 'react-redux'
import {changeStateValue} from '../../reduxx/MainReducer'


function Input({type,placeholder,name,value}) {
    const dispatch =useDispatch();
    function getInpValue(e) {
        dispatch(changeStateValue({
          name:e.target.name,
          value:e.target.value
        }))
      }


  return (

    <input onChange={(e)=>getInpValue(e)} type={type} id="logEmail" name={name} value={value} className="login__input" placeholder={placeholder} />

  )
}

export default Input