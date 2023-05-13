import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to={'/user/empty'}>Chat</Link></li>
          <li><Link to={'/all-contacts'}>Contacts</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Nav