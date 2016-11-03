import React from 'react'
import $ from 'jquery'
import { withRouter } from 'react-router'

export class Counter extends React.Component<void, Props, void> {
  constructor () {
    super();
    this.state = {
      "loginName":"",
      "password":"",
    };
    this.onSubmit = this.onSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.logout = this.logout.bind(this)
  }

  onSubmit(e){
    var scope = this;
    console.log(scope)
    e.preventDefault()
    console.log(this.state)
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

  logout(e){
    var scope = this;
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "http://localhost:1337/logout",
      data: {id:1},
      success:function(responseText,foo,fullResponse){
        console.log(responseText,foo,fullResponse)
        if(responseText == "logged out"){
          scope.props.userIdUpdate(-1)     
          scope.props.router.push({'pathname':'/login'})     
        }
      }
    });
  }

  onChange(e){
    console.log(e.target.id,e.target.value)
    var newState = {};
    newState[e.target.id] = e.target.value
    this.setState(newState)
  }

  render(){

    if(this.props.counter.id > 0){
      var display = [];
      display.push(this.props.children)
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

    console.log(this)
    return(
      <div className='container'>
        <div style={{margin: '0 auto',color:"red"}}>
          {display}
        </div>
      </div>
    )
  }
}
Counter.propTypes = {
  counter     : React.PropTypes.object.isRequired
}

export default withRouter(Counter)
