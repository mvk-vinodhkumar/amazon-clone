import React from "react"
import "./Product.css"
import { useStateValue } from "./StateProvider"

const Product = (props) => {
  const [state, dispatch] = useStateValue()
  const addToBasket = () => {
    dispatch({
      type: "ADD_TO_BASKET",
      item: {
        id: props.id,
        title: props.title,
        image: props.image,
        price: props.price,
        rating: props.rating,
      },
    })
  }

  return (
    <div className="product">
      <div className="product__info">
        <h2 className="product__title">{props.title}</h2>
        <span className="product__price">
          <small>₹</small>
          <strong>{props.price}</strong>
        </span>
        <div className="product__rating">
          {Array(props.rating)
            .fill("⭐")
            .map((star, index) => (
              <span key={index}>{star}</span>
            ))}
        </div>
      </div>

      <img src={props.image} alt="product image" />
      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  )
}

export default Product
