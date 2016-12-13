import React from 'react'

import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'

export class LoginSignupContainer extends React.Component<void, Props, void> {
  constructor () {
    super();
    this.state = {
      "form":"login",
    };
    this.formChange = this.formChange.bind(this)
  }

  formChange(e){
    e.preventDefault();
    var source = e.target.id.split("Switch")[0];
    if(source == "signup"){
      this.setState({form:"login"})      
    }
    else{
      this.setState({form:"signup"})       
    }
  }

  render(){
    var nav = this.props.nav ? this.props.nav : false
    if(this.state.form == "signup"){
      return (<SignupForm nav={nav} formChange={this.formChange} onChange={this.props.onChange} onSubmit={this.props.onSubmit} />)
    }
    else{
      return (
        <LoginForm nav={nav} formChange={this.formChange} onChange={this.props.onChange} onSubmit={this.props.onSubmit} />
        )
    }

  }

}

export default (LoginSignupContainer)