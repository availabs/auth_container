import React from 'react'

// import DuckImage from '../assets/Duck.jpg'
// import './Login.scss'
import { Router, Route, Link, browserHistory,withRouter } from 'react-router'
import $ from 'jquery'

export class Login extends React.Component<void, Props, void> {
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
        if(fullResponse.responseText == "Successful Login"){
          scope.props.router.push({'pathname':'/counter'})
        }
      }
    });
  }

  logout(e){
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "http://localhost:1337/logout",
      data: {id:1},
      success:function(responseText,foo,fullResponse){
        console.log(responseText,foo,fullResponse)
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
    return (  
      <div className='container'>
        <div className='row'>
          <div className='col-sm-6 col-md-4 offset-md-4'>
            <div className='card'>
              <div className='view overlay hm-white-slight'>
                <br />
                <img style={{ width: '96px',
                  height: '96px',
                  margin: '0 auto 10px',
                  display: 'block',
                  borderRadius: '50%'}}
                  src='https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=120'
                  alt='' />
                <a href='#'>
                  <div className='mask'></div>
                </a>
              </div>
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
              <div className="card-block">
               <form  onClick={this.logout} className="form-signin">
                  <div className="panel-footer" id="logout">
                    <button  className="btn btn-block btn-lg btn-danger">
                      LOGOUT
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  }



}




export default withRouter(Login)
