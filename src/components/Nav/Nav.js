import React from 'react'
import { IndexLink, Link,Router, withRouter } from 'react-router'
import './Nav.scss'
import $ from 'jquery'

import UserStore from '../../routes/AuthContainer/modules/UserStore.js'
import UserActions from '../../routes/AuthContainer/modules/UserActions.js'
import LogoutButton from '../../routes/AuthContainer/components/LogoutButton'
import LoginMenu from '../../routes/AuthContainer/components/LoginMenu'

class Nav extends React.Component<void, Props, void> {
  constructor () {
      super();
      this.state = {
        expanded:""
      }
      this.dropClick = this.dropClick.bind(this)
      this.createAdminLinks = this.createAdminLinks.bind(this)
      this.createNavLinks = this.createNavLinks.bind(this)
      this.forceUpdate = this.forceUpdate.bind(this)
  }

  componentDidMount(){
    var scope = this;
    UserStore.addChangeListener(this.forceUpdate)
    $('body').bind('click', function(e) {
      if(scope.state.expanded == "open"){
        if($(e.target).closest('#adminDrop').length == 0) {
          // click happened outside of .navbar, so hide
          scope.setState({expanded:""})
        }          
      }
    });    
  }

  dropClick(){
    if(this.state.expanded == ""){
      this.setState({expanded:"open"})
    }
    else{
      this.setState({expanded:""})
    }
  }

  createAdminLinks(displayStyle){
    var scope = this;
    var adminOptions = ['groupadmin','useradmin','sysadmin'];
    var adminBool = false;

    var adminButtons = adminOptions.map(title => {
      //Part of hacky workaround to make admin nav dropdown work
      if(!adminBool){
        adminBool = this.props.router.isActive(("/"+title)) ? true : false       
      }

      return (
        <li key={title} id={title} className={"btn btn-primary navButton " + (this.props.router.isActive(("/"+title)) ? "active" : "")}>
          <Link to={"/"+title} className='nav-link' activeClassName="route--active"><span>{title}</span></Link>
        </li>
        )
    })

    return(
      <li id="adminDrop" className={"btn-group navButton " + this.state.expanded} style={{display:displayStyle}}>
          <button className={"btn btn-primary dropdown-toggle navButton " + (adminBool ? " active " : "")} type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded={!!this.state.expanded} onClick={this.dropClick}>Administrator</button>
          <ul className="dropdown-menu">
            {adminButtons}
          </ul>
      </li>
      )
  }

  createNavLinks(){
    var navOptions = ["login","testing"]  
    var navButtons = navOptions.map(title => {
      return (
        <li key={title} id={title} className={"btn btn-primary navButton " + (this.props.router.isActive(("/"+title)) ? "active" : "")}>
          <Link to={"/"+title} className='nav-link' activeClassName="route--active"><span>{title}</span></Link>
        </li>
        )
    })

    return navButtons
  }

  render(){
    var scope = this;
    var user = UserStore.getSessionUser()
    var adminDisplay;

    adminDisplay = ((user.userGroup && user.userGroup.type == "sysAdmin") ? "" : "none")

    var adminPanel = scope.createAdminLinks(adminDisplay)
    var navLinks = scope.createNavLinks()

    console.log("nav scope",scope)


    return (
      <nav className='navbar navbar-dark blue'>
        <div className='container'>
          <div id='topNav'>
            <IndexLink to='/' className='navbar-brand'>
              Auth Demo
            </IndexLink>
            <ul className='navbar-left btn-group col-xs-8'>
              {navLinks}
              {adminPanel}
            </ul>
            {(user.token && user.token != "") ? <LogoutButton /> : <LoginMenu />}
          </div>
        </div>
      </nav>
      )    
  }

}
export default withRouter(Nav)
