import React from 'react'

export class LoginForm extends React.Component<void, Props, void> {
  render(){
    return (
      <div className='card-block'>
        <h4 className='card-title' style={{ textAlign: 'center' }}>Sign In</h4>
         <form className="form-signin">
            <fieldset>
              <div className="form-group">
                <div className="input-group">
                   <input  onChange={this.props.onChange} id="email" name="email" type="text"
                  className="form-control input-lg"  placeholder="Username/Email"
                  required/>                                   
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                  <input onChange={this.props.onChange} id="password" name="password" type="password"
                      className="form-control input-lg" placeholder="Password"
                      required/>                                       
                </div>
              </div>
            </fieldset>
            <div className="panel-footer" id="login-footer">
              <button onClick={this.props.onSubmit.bind(null,"http://localhost:1337/login/auth")} className="btn btn-block btn-lg btn-success">
                Sign In
              </button>
              <button id="loginSwitch" className="btn btn-block" onClick={this.props.formChange}>
                Need to create an account?
              </button>
            </div>
          </form>
      </div>
    )
  }
}

export default (LoginForm)