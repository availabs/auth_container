import React from 'react'


export class Counter extends React.Component<void, Props, void> {

  render(){
    console.log(this)
    return(
      <div className='container'>
        <div style={{ margin: '0 auto' }} >
          <h2>UserId: {this.props.counter}</h2>
        </div>
      </div>
    )
  }
}
Counter.propTypes = {
  counter     : React.PropTypes.number.isRequired
}

export default Counter
