import React from "react"
import logo from "../assets/amazon-logo.png"
import SearchIcon from "@mui/icons-material/Search"
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket"
import { Link } from "react-router-dom"
import "./Header.css"
import { useStateValue } from "./StateProvider"
import { auth } from "../firebase"

const Header = () => {
  const [state, dispatch] = useStateValue()

  const authenticationHandler = () => {
    if (state.user) {
      auth.signOut() //signOut is a firebase method to logout
    }
  }

  const userEmail = state.user?.email

  return (
    <header className="header">
      <Link to="/" className="header__logo">
        <img src={logo} alt="logo" style={{ width: "100%" }} />
      </Link>

      <div className="header__search">
        <input type="text" className="header__searchInput" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <nav className="header__nav">
        <Link to={!state.user && "/login"}>
          <div onClick={authenticationHandler} className="header__option">
            <span className="header__optionLineOne">
              Hello, {state.user ? userEmail : "Guest"}
            </span>
            <span className="header__optionLineTwo">
              {state.user ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>
        <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">Orders</span>
        </div>
        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon className="header__optionBasket" />
            <span className="header__optionLineTwo header__basketCount">
              {state.basket?.length}
            </span>
          </div>
        </Link>
      </nav>
    </header>
  )
}

export default Header
