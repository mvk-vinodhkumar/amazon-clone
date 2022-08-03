import React, { useRef } from "react"
import { Link, useHistory } from "react-router-dom"
import { auth } from "../firebase.js"
import "./Login.css"

const Login = () => {
  const history = useHistory()

  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const loginInFormHandler = (event) => {
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value

    auth
      .signInWithEmailAndPassword(enteredEmail, enteredPassword)
      .then((auth) => {
        history.push("/")
      })
      .catch((error) => alert(error.message))
  }

  const registerHandler = (event) => {
    event.preventDefault()

    const enteredEmail = emailInputRef.current.value
    const enteredPassword = passwordInputRef.current.value

    auth
      .createUserWithEmailAndPassword(enteredEmail, enteredPassword)
      .then((auth) => {
        //successfully created an user with entered crendentials
        console.log(auth)
      })
      .catch((error) => alert(error.message))
  }

  return (
    <div className="login">
      <Link to="/">
        <img
          className="login__logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
        />
      </Link>

      <div className="login__container">
        <h1>Sign In</h1>

        <form onSubmit={loginInFormHandler}>
          <label>E-mail</label>
          <input type="text" ref={emailInputRef} required />

          <label>Password</label>
          <input type="password" ref={passwordInputRef} required />

          <button type="submit" className="login__signInButton">
            Sign In
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button
          type="button"
          onClick={registerHandler}
          className="login__registerButton"
        >
          Create your Amazon Account
        </button>
      </div>
    </div>
  )
}

export default Login
