import React from 'react'
import $ from 'jquery'
import { withRouter } from 'react-router'

export class AuthContainer extends React.Component<void, Props, void> {
  constructor () {
    super();
    this.state = {
      "loginName":"",
      "password":"",
      "auth":false
    };
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.logout = this.logout.bind(this)
    this.checkAuth = this.checkAuth.bind(this)
  }

  onSubmit(e){
    var scope = this;

    e.preventDefault()

    $.ajax({
      type: "POST",
      url: "http://localhost:1337/login/auth",
      data: {loginName:this.state.loginName,password:this.state.password},
      success:function(responseText,foo,fullResponse){
        console.log(responseText,foo,fullResponse)
        if(responseText.token){
          scope.props.userIdUpdate({id:responseText.id,token:responseText.token})
          scope.props.router.push({'pathname':'/login'})
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
      success:function(responseText,foo,fullResponse){
        cb(responseText.auth)
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
      success:function(responseText,foo,fullResponse){

        if(responseText == "logged out"){
          scope.props.userIdUpdate(-1)     
          scope.props.router.push({'pathname':'/login'})     
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
    console.log("should comp update",nextState,this.state)
    if(nextProps.authContainer.id != this.props.authContainer.id ||
      nextProps.authContainer.token != this.props.authContainer.token ||
      nextState.auth != this.state.auth){
      return true
    }
    else{
      return false
    }
  }

  componentWillReceiveProps(nextProps){
    var scope = this;
    console.log(this)
    if(nextProps.authContainer.id > 0){
      scope.checkAuth(nextProps.authContainer.id,nextProps.authContainer.token,function(result){
        if(result){
          scope.setState({auth:true}) 
        }
        else{
          scope.setState({auth:false})    
        }
      })        
    }
  }

  render(){
    var scope = this;
    if(this.props.authContainer.id > 0){
      var display = [];

      if(this.state.auth){
        display.push(scope.props.children)  
      }
      else{
        display.push(             
                <div className="card-block">
                  <h3>You do not have permission to view this content</h3>
                </div>)          
      }

      display.push(             
              <div className="card-block">
               <form  onClick={this.logout} className="form-signin">
                  <div className="panel-footer" id="logout">
                    <button  className="btn btn-block btn-lg btn-danger">
                      LOGOUT
                    </button>
                  </div>
                </form>
              </div>)  
    }
    else{
      var display = (
              <div className='card-block'>
                  <h4 className='card-title' style={{ textAlign: 'center' }}>Sign In</h4>
                   <form className="form-signin">
                      <fieldset>
                        <div className="form-group">
                          <div className="input-group">
                              <label className="input-group-addon" htmlFor="loginName">
                                   <input  onChange={this.onChange} id="loginName" name="loginName" type="text"
                                  className="form-control input-lg"  placeholder="Username"
                                  required/>                                   
                              </label>
                          </div>
                        </div>
                        <div className="form-group">
                          <div className="input-group">
                              <label className="input-group-addon" htmlFor="password">
                              <input onChange={this.onChange} id="password" name="password" type="password"
                                  className="form-control input-lg" placeholder="Password"
                                  required/>                                       
                              </label>
                          </div>
                        </div>
                      </fieldset>
                      <div className="panel-footer" id="login-footer">
                        <button onClick={this.onSubmit} className="btn btn-block btn-lg btn-success">
                          Sign In
                        </button>
                      </div>
                    </form>
              </div>
              )
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
