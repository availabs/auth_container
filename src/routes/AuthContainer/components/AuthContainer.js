import React from 'react'
import $ from 'jquery'
import { withRouter } from 'react-router'

import NoPermission from '../components/NoPermission'
import LoginSignupContainer from '../components/LoginSignupContainer'

import UserActions from '../modules/UserActions.js'
import UserStore from '../modules/UserStore.js'

var AUTH_HOST = require('../../../../DEV_CONFIG.json').host

export class AuthContainer extends React.Component<void, Props, void> {
  constructor () {
    super();
    this.state = {
      "email":"",
      "password":"",
      "confirmpassword":"",
      "error":""
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

  checkAuth(cb){
    var user = UserStore.getSessionUser()
    console.log("ry check auth 1st", user)
    var scope = this;
    var returnValue;
    $.ajax({
      type: "POST",
      url: (AUTH_HOST+"checkauth"),
      data: {token:user.token},
      success:function(responseText,requestStatus,fullResponse){
        if(responseText.error){
          console.log("check auth 2nd FAIL",responseText)
          cb(responseText)
        }
        if(responseText.userName){
          console.log("check auth 2nd SUCCESS",responseText)
          cb(responseText)          
        }
      }
    });
  }

  onChange(e){
    var newState = {};
    newState[e.target.id] = e.target.value
    this.setState(newState)
  }

  componentWillMount(){
    var scope = this;
    var user = UserStore.getSessionUser()
    scope.checkAuth(function(result){
      console.log("checkauth cb",result)
      user.status = result.status

      //Means expired token
      //Log in again
      if(result.error && result.error.message == "jwt expired"){
        user.token = "";
        user.loggedIn = false;
        user.userGroup = null;
        user.userName = ""
        user.userId = -1
        UserActions.setSessionUser(user)
        scope.setState({"error":"Your session has expired."})       
      }
      else if(result.error && result.error.message == "jwt must be provided"){
        user.token = "";
        user.loggedIn = false;
        user.userGroup = null;
        user.userName = ""
        user.userId = -1
        UserActions.setSessionUser(user)
        scope.setState({"error":null})       
      }
      //Means no permission
      else if(!result.status){
        UserActions.setSessionUser(result)
        scope.setState({"error":result.status})            
      }
      //We good
      else{
        UserActions.setSessionUser(result)
        scope.setState({"error":null}) 
      }
    }) 
  }

  render(){
    var user = UserStore.getSessionUser()
    console.log("auth container render, user",user)
    var scope = this;
    //console.log("auth this",this.props.redirect,this)
    if(user.token && user.token != ""){
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
        <h1 style={{color:"red"}}>{this.state.error}</h1>
        {display}
      </div>
    )
  }
}

export default withRouter(AuthContainer)
