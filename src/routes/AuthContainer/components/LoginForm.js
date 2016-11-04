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
                    <label className="input-group-addon" htmlFor="loginName">
                         <input  onChange={this.props.onChange} id="loginName" name="loginName" type="text"
                        className="form-control input-lg"  placeholder="Username"
                        required/>                                   
                    </label>
                </div>
              </div>
              <div className="form-group">
                <div className="input-group">
                    <label className="input-group-addon" htmlFor="password">
                    <input onChange={this.props.onChange} id="password" name="password" type="password"
                        className="form-control input-lg" placeholder="Password"
                        required/>                                       
                    </label>
                </div>
              </div>
            </fieldset>
            <div className="panel-footer" id="login-footer">
              <button onClick={this.props.onSubmit} className="btn btn-block btn-lg btn-success">
                Sign In
              </button>
            </div>
          </form>
      </div>
    )
  }
}

export default (LoginForm)