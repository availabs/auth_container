import React from 'react'
import UserStore from '../modules/UserStore.js'
import UserActions from '../modules/UserActions.js'
import { IndexLink, Link,Router, withRouter } from 'react-router'
import $ from 'jquery'

import LoginSignupContainer from '../components/LoginSignupContainer'

var AUTH_HOST = require('../../../../DEV_CONFIG.json').host

export class LoginMenu extends React.Component<void, Props, void> {
  constructor () {
    super();
    this.state = {
      expanded:""
    }
    this.logout = this.logout.bind(this)
    this.dropClick = this.dropClick.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
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

  onSubmit(url,e){
    var scope = this;
    e.preventDefault()
    $.ajax({
      type: "POST",
      url: url,
      data: {email:this.state.email,password:this.state.password,confirmpassword:this.state.confirmpassword},
      success:function(responseText,requestStatus,fullResponse){
        //console.log("Submitted login/signup", responseText,requestStatus,fullResponse)
        console.log("ry test submit", responseText)
        if(responseText.token){
          //console.log("Successful login/signup, recieved token",responseText.token)
          UserActions.setSessionUser(responseText)
          scope.setState({"error":null})
          scope.props.router.push({'pathname':scope.props.redirect})
        }
        else{
          scope.setState({"error":responseText})
        }
      }
    });
  }
  componentDidMount(){
    var scope = this;
    $('body').bind('click', function(e) {
      if(scope.state.expanded == "open"){
        if($(e.target).closest('#loginDrop').length == 0) {
          // click happened outside of .navbar, so hide
          scope.setState({expanded:""})
        }          
      }
    });    
  }
  onChange(e){
    var newState = {};
    newState[e.target.id] = e.target.value
    this.setState(newState)
  }
  dropClick(){
    if(this.state.expanded == ""){
      this.setState({expanded:"open"})
    }
    else{
      this.setState({expanded:""})
    }
  }
  render(){
    var scope = this;

    return (
        <ul style={{float:"right"}}>
          <li id="loginDrop" className={"btn-group navButton " + this.state.expanded}>
            <button className="btn btn-primary navButton" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded={!!this.state.expanded} onClick={this.dropClick}>Login</button>
            <ul className="dropdown-menu">
              <li>
                <LoginSignupContainer nav={true} key="loginOrSignupForm" onChange={this.onChange} onSubmit={this.onSubmit}/>
              </li>
            </ul>
        </li>
        </ul>
      )
  }

}

export default withRouter(LoginMenu)
