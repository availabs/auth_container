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
          <li className='nav-item'>
            <Link to='/login' className='nav-link'>Login</Link>
          </li>
          <li className='nav-item'>
            <Link to="/testing" className='nav-link'>Testing</Link>
          </li>
          <li className='nav-item'>
              <Link to="/groupadmin" className='nav-link'>GroupAdmin</Link>
          </li>
          <li className='nav-item'>
              <Link to="/useradmin" className='nav-link'>UserAdmin</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
)

export default Nav
