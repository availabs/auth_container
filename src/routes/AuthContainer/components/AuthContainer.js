import React from 'react'
import $ from 'jquery'
import { withRouter } from 'react-router'

import NoPermission from '../components/NoPermission'
import LogoutForm from '../components/LogoutForm'
import LoginSignupContainer from '../components/LoginSignupContainer'

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
    this.logout = this.logout.bind(this)
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
        console.log(responseText,requestStatus,fullResponse)
        if(responseText.token){
          scope.props.userIdUpdate({id:responseText.id,token:responseText.token,status:responseText.status})
          scope.props.router.push({'pathname':scope.props.redirect})
        }
      }
    });
  }

  checkAuth(id,token,cb){
    var scope = this;
    var returnValue;
    $.ajax({
      type: "POST",
      url: "http://localhost:1337/checkauth",
      data: {id:id, token:token,content:"testing_content"},
      success:function(responseText,requestStatus,fullResponse){
        cb(responseText.status)
      }
    });
  }

  logout(e){
    var scope = this;
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "http://localhost:1337/logout",
      data: {id:scope.props.authContainer.id, token:scope.props.authContainer.token},
      success:function(responseText,requestStatus,fullResponse){
        if(responseText == "logged out"){
          scope.props.userIdUpdate({id:-1,token:"",status:false})   
          scope.props.router.push({'pathname':scope.props.redirect})     
        }
      }
    });
  }

  onChange(e){
    var newState = {};
    newState[e.target.id] = e.target.value
    this.setState(newState)
  }

  shouldComponentUpdate(nextProps,nextState){
    //console.log(nextProps.authContainer,this.props.authContainer)
    if(nextProps.authContainer.id != this.props.authContainer.id ||
      nextProps.authContainer.token != this.props.authContainer.token ||
      nextProps.authContainer.status != this.props.authContainer.status){
      return true
    }
    else{
      return false
    }
  }

  componentWillUpdate(){
    var scope = this;
    console.log(this)
    if(this.props.authContainer.id > 0){
      scope.checkAuth(this.props.authContainer.id,this.props.authContainer.token,function(result){
          scope.props.authStatusUpdate(result)
      })        
    }
  }

  render(){
    var scope = this;
    console.log("auth this",this.props.redirect,this)
    if(this.props.authContainer.id > 0){
      var display = [];

      if(this.props.authContainer.status){
        display.push(scope.props.children)  
      }
      else{
        display.push(<NoPermission key="noPermission"/>)          
      }

      display.push(<LogoutForm key="logoutForm" logout={this.logout}/>)  
    }
    else{
      var display = (<LoginSignupContainer key="loginOrSignupForm" onChange={this.onChange} onSubmit={this.onSubmit}/> )
    }

    return(
      <div className='container'>
        <div style={{margin: '0 auto',color:"red"}}>
          {display}
        </div>
      </div>
    )
  }
}
AuthContainer.propTypes = {
  authContainer     : React.PropTypes.object.isRequired
}

export default withRouter(AuthContainer)
