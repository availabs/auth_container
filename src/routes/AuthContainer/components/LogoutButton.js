import React from 'react'
import UserStore from '../modules/UserStore.js'
import UserActions from '../modules/UserActions.js'
import { IndexLink, Link,Router, withRouter } from 'react-router'
import $ from 'jquery'


var AUTH_HOST = require('../../../../DEV_CONFIG.json').host

export class LogoutButton extends React.Component<void, Props, void> {
  constructor () {
      super();
      this.logout = this.logout.bind(this)
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
    return (
        <ul style={{float:"right"}}>
          <li>
            <button className="btn btn-primary navButton" onClick={scope.logout}>
              Logout
            </button>
          </li>
        </ul>
      )
  }

}

export default withRouter(LogoutButton)
