import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Card({name='',email='',id=''}) {
const chatUsers=useSelector(state=>state.Data.chatUsers)
const navigate = useNavigate()
function addToUsers() {
     const user={
          name:name,
          id:id
     }
  
     navigate(`/user/${id}`)
}
const copy = async () => {
     await navigator.clipboard.writeText(name);
   }

  return (
    <div className='card'>
     <div className="img-name">
     <img src="https://tropeshko.com/images/review_avatar.png" alt="" />
    {
         name !=''?
         <h3 className='name'><span>{name}</span></h3>:null
    }
    {/* {
         email !=''?
         <h3 className='email'>Email: <span>{email}</span></h3>:null
    } */
    }
     <button className='copy' onClick={copy}><i className="fa-solid fa-paperclip"></i></button>

     </div>
     
    <button onClick={()=>(addToUsers())} className='add-to-users'>Add</button>
 </div>
  )
}

export default Card