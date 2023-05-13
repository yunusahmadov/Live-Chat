import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, getUsers } from '../actions/MainAction'
import Card from '../components/page_components/Card'
import Nav from '../components/page_components/Nav'

function Contacts() {
    const users=useSelector(state=>state.Data.users)
    const dispatch=useDispatch()
    const oneData=useSelector(state=>state.Data.oneData)
    const [search, setSearch] = useState('')

    useEffect(()=>{
        dispatch(getAllUsers())
        dispatch(getUsers())
    },[])


    function sendSrearchData(e){
        setSearch(e.target.value);
        dispatch(getUsers(e.target.value))
      }

  return (
    <section className='page'>
        <Nav/>

    <div className="contacts-container">
        <h1>Your Contacts</h1>        
        <input value={search} onChange={(e)=>sendSrearchData(e)} type={'text'} placeholder='Seacrh...'  />

              {
                  users.map((data, i) => {
                      console.log(data);
                      return (
                          <Card
                              key={i}
                              name={data.name}
                              email={data.email}
                              id={data.id}
                          />
                      )
                  })
              }
    </div>
    </section>
  )
}

export default Contacts