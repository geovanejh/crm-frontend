import React from 'react'
import imgLogin from '../../../assets/login.jpg'
import { LoginContainer } from './LoginComponent.styled'
import { StyledInput } from '../../Form/Input/Input.styled'

const LoginComponent = () => {
  return (
    <LoginContainer>
      <img src={imgLogin} alt="placeholder" />
      <div>
        <form>
          <h1>Sign in</h1>
          <StyledInput type="text" />
          <StyledInput type="text" />
          <a>Forgot password?</a>
          <button>confirm</button>
        </form>
      </div>
    </ LoginContainer>
  )
}

export default LoginComponent
