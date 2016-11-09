import React from 'react'
import AuthContainer from '../../AuthContainer/containers/AuthContainerContainer'


export class Login extends React.Component<void, Props, void> {
  render(){
    return (  
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12'>
            <div className='card'>
              <div className='card-block'>
                <AuthContainer redirect="/login">
                  <h3>Testing </h3>
                  <h5 style={{color:"blue"}}>This is some other restricted content</h5>
                </AuthContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
