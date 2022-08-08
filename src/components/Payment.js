import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import CheckoutProduct from "./CheckoutProduct"
import "./Payment.css"
import { useStateValue } from "./StateProvider"
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js"
import CurrencyFormat from "react-currency-format"
import { getBasketTotal } from "./reducer"
import axios from "../axios"

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue()

  const stripe = useStripe()
  const elements = useElements()

  const [error, setError] = useState(null)
  const [disabled, setDisabled] = useState(true)
  const [succeeded, setSucceeded] = useState(false)
  const [processing, setProcessing] = useState("")
  const [clientSecret, setClientSecret] = useState(true)

  const history = useHistory()

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer(the basket amount)

    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        //Stripe expects the total in a currency subunits
        url: `/payments/create?total=${getBasketTotal(basket) * 100}`, //100paise is 1 rupee
      })
      setClientSecret(response.data.clientSecret)
    }

    getClientSecret()
  }, [basket])

  console.log("Client Secret >>> ", clientSecret)

  const paymentSubmitHandler = async (event) => {
    //stripe logic - when card details are submitted
    event.preventDefault()
    setProcessing(true)

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        // paymentIntent = payment confirmation
        //{paymentIntent} - is destructured from response object

        setSucceeded(true)
        setError(null)
        setProcessing(false)

        history.replace("/orders")
      })
  }

  const changeCardHandler = (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details

    setDisabled(event.empty)
    setError(event.error ? event.error.message : "")
  }

  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>

        {/* Delivery address */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>123 React Lane</p>
            <p>Los Angeles, CA</p>
          </div>
        </div>

        {/* Review Items */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>

        {/* Payment method */}
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            {/* Stripe code */}
            <form onSubmit={paymentSubmitHandler}>
              <CardElement onChange={changeCardHandler} />

              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3>Order Total: {value}</h3>}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"₹"}
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                </button>
              </div>

              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Payment
