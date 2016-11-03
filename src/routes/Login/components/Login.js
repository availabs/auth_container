import React from 'react'
import Counter from '../../Counter/containers/CounterContainer'


export class Login extends React.Component<void, Props, void> {
  render(){
    console.log(this)
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
                <Counter>
                  <h3>Testing </h3>
                </Counter>
              </div>
            </div>
          </div>
        </div>
      </div>
    )

  }



}




export default Login
