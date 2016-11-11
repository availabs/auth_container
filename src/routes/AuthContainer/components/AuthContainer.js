import React from 'react'
import $ from 'jquery'
import { withRouter } from 'react-router'

import NoPermission from '../components/NoPermission'
import LogoutForm from '../components/LogoutForm'
import LoginSignupContainer from '../components/LoginSignupContainer'

import UserActions from '../modules/UserActions.js'
import UserStore from '../modules/UserStore.js'

export class AuthContainer extends React.Component<void, Props, void> {
  constructor () {
    super();
    this.state = {
      "email":"",
      "password":"",
      "confirmpassword":""
    };
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.checkAuth = this.checkAuth.bind(this)
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
        if(responseText.token){
          //console.log("Successful login/signup, recieved token",responseText.token)
          UserActions.setSessionUser(responseText)
          scope.props.router.push({'pathname':scope.props.redirect})
        }
      }
    });
  }

  checkAuth(cb){
    var user = UserStore.getSessionUser()
    //console.log("ry check auth", user)
    var scope = this;
    var returnValue;
    $.ajax({
      type: "POST",
      url: "http://test.com:1337/checkauth",
      data: {id:user.id, token:user.token,content:"testing_content"},
      success:function(responseText,requestStatus,fullResponse){
        //console.log("check auth",responseText.status)
        cb(responseText.status)
      }
    });
  }

  onChange(e){
    var newState = {};
    newState[e.target.id] = e.target.value
    this.setState(newState)
  }

  componentWillUpdate(){
    var user = UserStore.getSessionUser()
    var scope = this;
    //console.log("component will update",this)
    if(user.id > 0){
      scope.checkAuth(function(result){
          user.status = result;
          UserActions.setSessionUser(user)
      })        
    }
  }

  render(){
    var user = UserStore.getSessionUser()
    console.log("auth container render, user",user)
    var scope = this;
    //console.log("auth this",this.props.redirect,this)
    if(user.id > 0){
      var display = [];

      if(user.status){
        display.push(scope.props.children)  
      }
      else{
        display.push(<NoPermission key="noPermission"/>)          
      }
    }
    else{
      var display = (<LoginSignupContainer key="loginOrSignupForm" onChange={this.onChange} onSubmit={this.onSubmit}/> )
    }

    return(
      <div >
        {display}
      </div>
    )
  }
}

export default withRouter(AuthContainer)
