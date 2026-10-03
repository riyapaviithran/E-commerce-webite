import React, { createContext, useState } from "react"
import all_product from "../Components/Assets/all_product"

export const ShopContext = createContext(null)

const getDefaultCart = () => {
  let cart = {}

  for (let index = 0; index < all_product.length; index++) {
    cart[index] = 0
  }

  return cart
}

const ShopContextProvider = (props) => {

  const [cartItems, setCartItems] = useState(getDefaultCart())

  // Add product to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] + 1
    }))
  }

  // Remove product from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] - 1
    }))
  }

  // Calculate total cart amount
  const getTotalCartAmount = () => {

    let totalAmount = 0

    for (const item in cartItems) {

      if (cartItems[item] > 0) {

        let itemInfo = all_product.find(
          (product) => product.id === Number(item)
        )

        totalAmount += itemInfo.new_price * cartItems[item]
      }
    }

    return totalAmount
  }

  // Calculate total number of products
  const getTotalCartItems = () => {

    let totalItem = 0

    for (const item in cartItems) {

      if (cartItems[item] > 0) {
        totalItem += cartItems[item]
      }

    }

    return totalItem
  }

  const contextValue = {
    getTotalCartItems,
    getTotalCartAmount,
    all_product,
    cartItems,
    addToCart,
    removeFromCart
  }

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  )
}

export default ShopContextProvider