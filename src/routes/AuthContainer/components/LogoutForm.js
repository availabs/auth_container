import React from 'react'

export class LogoutForm extends React.Component<void, Props, void> {
  render(){
    return (
      <div className="card-block">
        <form onClick={this.props.logout} className="form-signin">
          <div className="panel-footer" id="logout">
            <button  className="btn btn-block btn-lg btn-danger">
              LOGOUT
            </button>
          </div>
        </form>
      </div>
      )
  }
}

export default (LogoutForm)