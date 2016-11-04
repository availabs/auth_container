import React from 'react'
import AuthContainer from '../../AuthContainer/containers/AuthContainerContainer'


export class Testing extends React.Component<void, Props, void> {
  render(){

    return (  
      <div className='container'>
        <div className='row'>
          <div className='col-sm-6 col-md-4 offset-md-4'>
            <div className='card'>
              <div className='card-block'>
                <AuthContainer redirect="/testing">
                  <h3>THIS IS A NEW TEST </h3>
                  <h4>This is restricted content</h4>
                </AuthContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  }



}




export default Testing
