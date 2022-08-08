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
//Stripe Payment Gateway
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"

const promise = loadStripe(
  "pk_test_51LSdSKSCAW4erSwFEztTGMUsE5iQ0DWSDC68WmVdq9k7FYF18SRUhCOnynLYhKsqoWdXlN8oDyOCqz69stTFFVkN002vwgxBHs"
)

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
          {/*Elements is an HOC  */}
          <Elements stripe={promise}>
            <Payment />
          </Elements>
        </Route>
      </Switch>
    </div>
  )
}

export default App
