import React from 'react'

import { IndexLink, Link } from 'react-router'
import './Nav.scss'

export const Nav = () => (
  <nav className='navbar navbar-dark blue'>
    <button className='navbar-toggler hidden-sm-up' type='button' data-toggle='collapse' data-target='#collapseEx2'>
      <i className='fa fa-bars' />
    </button>

    <div className='container'>
      <div className='collapse navbar-toggleable-xs' id='collapseEx2'>
        <IndexLink to='/' className='navbar-brand'>
          Project Name
        </IndexLink>
        <ul className='nav navbar-nav'>
          <li className='nav-item' >
            <Link to='/' className='nav-link active'>Home</Link>
          </li>
          <li>
            <Link to='/login' className='nav-link'>Login</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
)

export default Nav
