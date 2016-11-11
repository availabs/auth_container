import React from 'react'
import { IndexLink, Link,Router, withRouter } from 'react-router'
import UserStore from '../../routes/AuthContainer/modules/UserStore.js'
import './Nav.scss'
import jQuery from 'jquery'



class Nav extends React.Component<void, Props, void> {
  constructor () {
      super();
      this.state = {expanded:""}
      this.dropClick = this.dropClick.bind(this)
      this.createAdminLinks = this.createAdminLinks.bind(this)
      this.createNavLinks = this.createNavLinks.bind(this)
  }

  componentDidMount(){
    var scope = this;
    jQuery('body').bind('click', function(e) {
        if(jQuery(e.target).closest('#adminDrop').length == 0) {
          // click happened outside of .navbar, so hide
          scope.setState({expanded:""})
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
    var user = UserStore.getSessionUser()
    var adminDisplay;

    console.log(this.props.router.isActive("/testing"))


    adminDisplay = ((user.userGroup && user.userGroup.type == "sysAdmin") ? "" : "none")

    var adminPanel = this.createAdminLinks(adminDisplay)
    var navLinks = this.createNavLinks()

    return (
      <nav className='navbar navbar-dark blue'>
        <button className='navbar-toggler hidden-sm-up' type='button' data-toggle='collapse' data-target='#collapseEx2'>
          <i className='fa fa-bars' />
        </button>

        <div className='container'>
          <div id='topNav'>
            <IndexLink to='/' className='navbar-brand'>
              Project Name
            </IndexLink>
            <ul className='collapse navbar-toggleable-xs navbar-left btn-group'>
              {navLinks}
              {adminPanel}
            </ul>
          </div>
        </div>
      </nav>
      )    
  }

}
export default withRouter(Nav)
