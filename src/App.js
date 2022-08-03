import "./App.css"
import Header from "./components/Header"
import Home from "./components/Home"
import { Switch, Route } from "react-router-dom"
import Checkout from "./components/Checkout"
import Login from "./components/Login"
import { useEffect } from "react"
import { auth } from "./firebase"
import { useStateValue } from "./components/StateProvider"
import Payment from "./components/Payment"

function App() {
  const [state, dispatch] = useStateValue()

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      //authUser comes from firebase
      console.log("The user is >>>>", authUser)

      if (authUser) {
        //user just/was loggedin

        dispatch({
          type: "SET_USER",
          user: authUser,
        })
      } else {
        //user logged out

        dispatch({
          type: "SET_USER",
          user: null,
        })
      }
    })
  }, [])

  return (
    <div className="App">
      <Switch>
        <Route path="/login" exact>
          <Login />
        </Route>

        <Route path="/" exact>
          <Header />
          <Home />
        </Route>

        <Route path="/checkout">
          <Header />
          <Checkout />
        </Route>

        <Route path="/payment">
          <Header />
          <Payment />
        </Route>
      </Switch>
    </div>
  )
}

export default App
