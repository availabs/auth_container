import React from 'react'
import { IndexLink, Link,Router, withRouter } from 'react-router'
import UserStore from '../../routes/AuthContainer/modules/UserStore.js'
import UserActions from '../../routes/AuthContainer/modules/UserActions.js'
import './Nav.scss'
import $ from 'jquery'

var AUTH_HOST = require('../../../DEV_CONFIG.json').host

class Nav extends React.Component<void, Props, void> {
  constructor () {
      super();
      this.state = {
        expanded:""
      }
      this.dropClick = this.dropClick.bind(this)
      this.createAdminLinks = this.createAdminLinks.bind(this)
      this.createNavLinks = this.createNavLinks.bind(this)
      this.logout = this.logout.bind(this)
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

  logout(e){
    var user = UserStore.getSessionUser()
    var scope = this;
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: (AUTH_HOST+"logout"),
      data: {id:user.id, token:user.token},
      success:function(responseText,requestStatus,fullResponse){
        UserActions.setSessionUser({id:-1,token:"",status:false})  
        if(responseText == "logged out"){ 
          scope.props.router.push({'pathname':scope.props.redirect})     
        }
        else{
          console.log("error logging out", responseText)
        }
      }
    });
  }

  render(){
    var scope = this;
    var user = UserStore.getSessionUser()
    var adminDisplay;
    var logoutButton;

    adminDisplay = ((user.userGroup && user.userGroup.type == "sysAdmin") ? "" : "none")

    var adminPanel = scope.createAdminLinks(adminDisplay)
    var navLinks = scope.createNavLinks()

    console.log("nav scope",scope)
    if(user.token && user.token != ""){
      logoutButton = (
        <ul style={{float:"right"}}>
          <li>
            <button className="btn btn-primary navButton" onClick={scope.logout}>
              Logout
            </button>
          </li>
        </ul>
      )
    }


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
            {logoutButton}
          </div>
        </div>
      </nav>
      )    
  }

}
export default withRouter(Nav)
