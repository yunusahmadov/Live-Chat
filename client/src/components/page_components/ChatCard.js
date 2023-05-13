import React from 'react'
import { Link } from 'react-router-dom'

function ChatCard({name='', id}) {
  return (
    <div className='cart'>
     <img src="https://tropeshko.com/images/review_avatar.png" alt="" />
     {
         name !=''?
         <p><Link to={`/user/${id}`}>{name}</Link></p>:null
    }
    </div>
  )
}

export default ChatCard