import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getActiveUsers, getAllUsers, getOneUser, getUserName } from '../actions/MainAction'
import ChatCard from '../components/page_components/ChatCard'
import Nav from '../components/page_components/Nav'
import io from "socket.io-client"
const socket = io.connect('http://localhost:5500')
function UserPage() {

  const users=useSelector(state=>state.Data.users)
  const activeUsers=useSelector(state=>state.Data.activeUsers)
  const dispatch=useDispatch()
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState('')
  const params = useParams();
  const [allMessage, setAllMsg] = useState([])
  function getMsg(){
    socket.emit("get-messages", {user_id: params.id, token: localStorage.getItem("token")});
    socket.on("messages", msg=>{
      console.log(msg)
      setAllMsg(msg)
    })
  }
  useEffect(()=>{
dispatch(getAllUsers())
// dispatch(getOneUser())
    
    if(params.id != 'empty'){
      socket.emit("join-user", localStorage.getItem("token"));
      getMsg();
      dispatch(getActiveUsers(localStorage.getItem("token")))
    }
  },[params.id]

)
// dispatch(getUserName())

function sendSearchData(e){
  setSearch(e.target.value);
  // dispatch(getUsers(e.target.value))

}
function sendMsg(msg){
  if(msg != ''){
    const obj = {
      token: localStorage.getItem("token"),
      to_id: params.id,
      msg: msg
    }
    socket.emit("send-msg", obj)
    setMsg("");
    getMsg();
    setTimeout(()=>{
      dispatch(getActiveUsers(localStorage.getItem("token")))
    }, 2000)

  }
}

console.log(activeUsers)
  return (
    
    <section className='page2'>
      <Nav/>
      <div className="messages">
        <div className="left-users">
        <input value={search} onChange={(e)=>sendSearchData(e)} type={'text'} placeholder={'Seacrh'} />

            {
                  activeUsers.map((data, i) => {
                      // console.log(data);
                      if(data.name.toLowerCase().includes(search.toLowerCase())){
                        return (
                          <ChatCard
                              key={i}
                              name={data.name}
                              id={data.id}
                          />
                      )
                      }
                      
                  })
              }

        </div>
        <div className="right-messages">
          <h1>Name</h1>
          <div className="chat">
            {
              allMessage.map((message, i)=>{
                if(message.to_id !== params.id){
                  return(
                    <div key={i} className="to_user">
                      {message.message}
                    </div>
                  )
                }else{
                  return(
                    <div key={i} className="from_user">
                      {message.message}
                    </div>
                  )
                }
              })
            }
          </div>
          <div className="input-cont">
          <input value={msg} onChange={e=>setMsg(e.target.value)} placeholder='Enter text' type="text" />
          <button onClick={()=>sendMsg(msg)} >send</button>
          {/* <i  className="fa-solid fa-paper-plane"></i> */}
          </div>
        </div>
        
      </div>

    </section>
  )
}

export default UserPage