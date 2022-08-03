export const initialState = {
  basket: [],
  user: null,
}

//This is called a selector - this technique is used in most of the prod code.
export const getBasketTotal = (basket) =>
  basket.reduce((total, item) => {
    const itemPrice = +item.price.replace(/\,/g, "") //convert string to number
    return itemPrice + total
  }, 0) //0 is the initial value for total

const reducer = (state, action) => {
  // console.log(action)

  switch (action.type) {
    case "ADD_TO_BASKET":
      return {
        ...state,
        basket: [...state.basket, action.item],
      }

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      )
      let newBasket = [...state.basket]

      if (index >= 0) {
        newBasket.splice(index, 1)
      } else {
        console.warn(`Can't remove product (id: ${action.id})`)
      }

      return {
        ...state,
        basket: newBasket,
      }

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      }

    default:
      return state
  }
}

export default reducer
