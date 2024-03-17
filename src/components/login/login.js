import { Component } from 'react'
import Cookies from 'js-cookie'
import './index.css'

class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        showSubmitError: false,
        errorMsg: '',
      }
    
      onChangeEmail = event => {
        this.setState({ email: event.target.value })
      }
    
      onChangePassword = event => {
        this.setState({ password: event.target.value })
      }
    
      onSubmitSuccess = jwtToken => {
        const { history } = this.props
    
        Cookies.set('jwt_token', jwtToken, { expires: 30 })
        history.replace('/')
      }
    
      onSubmitFailure = errorMsg => {
        this.setState({ showSubmitError: true, errorMsg })
      }
    
      submitForm = async event => {
        event.preventDefault()
        const { email, password } = this.state
        const userDetails = { email, password }
        const url = 'https://apis.ccbp.in/login'
        const options = {
          method: 'POST',
          body: JSON.stringify(userDetails),
        }
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.ok === true) {
          this.onSubmitSuccess(data.jwt_token)
        } else {
          this.onSubmitFailure(data.error_msg)
        }
      }
    

  renderPasswordField = () => {
    const { password } = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-filed"
          value={password}
          onChange={this.onChangePassword}
        />
      </>
    )
  }

  renderEmailField = () => {
    const { email } = this.state
    return (
      <>
        <label className="input-label" htmlFor="email">
          EMAIL ADDRESS
        </label>
        <input
          type="text"
          id="email"
          className="email-input-filed"
          value={email}
          onChange={this.onChangeEmail}
        />
      </>
    )
  }


  render() {
    const { showSubmitError, errorMsg } = this.state
    return (
      <div className="login-container">
        <div className="board-container">
          <h1 className="board-text">Board</h1>
        </div>
        <div className="login-container">
        <div className="signin-form-container">
          <h1 className="signin-heading">Sign-in</h1>
          <p className="signin-paragraph">Sign in to your account</p>
          <button className="signin-google-button">Sign in with Google</button>
          <button className="signin-apple-button">Sign in with Apple</button>
          <form className="form-container" onSubmit={this.submitForm}>
            <div className="input-container">{this.renderEmailField()}</div>
            <div className="input-container">{this.renderPasswordField()}</div>
            <div className="forgot-password">
              <a href="#">Forgot Password</a>
            </div>
            <button type="submit" className="signin-button">
              Sign-in
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
            <div className="register-link">
              <p>Don't have an account? <a href="#">Register here</a></p>
            </div>
          </form>
        </div>
      </div>
      </div>
    )
  }
}

export default LoginForm
