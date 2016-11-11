import React from 'react'

export class LoginForm extends React.Component<void, Props, void> {
  render(){
    return (
      <div className='card-block'>
        <h4 className='card-title'>Permission is required to access this content</h4>
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
              <div className="row" style={{marginTop:"15px"}}>
                <div className="col-xs-4">
                  <button onClick={this.props.onSubmit.bind(null,"http://test.com:1337/login/auth")} className="btn btn-block btn-lg btn-success">
                    Sign In
                  </button> 
                </div>
                <div className="col-xs-4 offset-xs-3">   
                  <button id="loginSwitch" className="btn btn-block" onClick={this.props.formChange}>
                    Need to create an account?
                  </button>
                </div>
              </div>
            </div>
          </form>
      </div>
    )
  }
}

export default (LoginForm)