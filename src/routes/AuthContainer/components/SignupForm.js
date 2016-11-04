import React from 'react'

export class SignupForm extends React.Component<void, Props, void> {
  render(){
    return(
      <form action="/signup/auth" method="POST" className="form-signin">
        <fieldset>
          <div className="panel-body">
            <div className="form-group">
              <div className="input-group">
                <input onChange={this.props.onChange} id="email" name="email" type="email"
                    className="form-control input-lg"  placeholder="E-Mail"
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
            <div className="form-group">
              <div className="input-group">
                <input onChange={this.props.onChange} id="confirmpassword" name="confirmpassword" type="password"
                    className="form-control input-lg" placeholder="Confirm Password"
                    required/>
              </div>
            </div>
          </div>
        </fieldset>
        <div className="panel-footer" id="login-footer">
          <div className="row" style={{marginTop:"15px"}}>
            <div className="col-xs-4">
              <button onClick={this.props.onSubmit.bind(null,"http://localhost:1337/signup/auth")} className="btn btn-block btn-lg btn-success">
              <span className="small-circle"><i className="fa fa-caret-right"></i></span>
              Create Account
            </button>  
            </div>
            <div className="col-xs-4 offset-xs-3">   
              <button id="signupSwitch" className="btn btn-block" onClick={this.props.formChange}>
                Already have an account?
              </button>
            </div>
          </div>
        </div>
      </form>   
    )
  }
}

export default (SignupForm)