import { createContext, useReducer, useState } from "react";
import { cartReducer, cartInitialState } from "../reducers/cart";
import { CART_ACTION_TYPES } from "../reducers/cart";

export const CartContext = createContext();

function useCartReducer() {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState);

  const addToCart = (product) =>
    dispatch({
      type: CART_ACTION_TYPES.ADD_TO_CART,
      payload: product,
    });

  const removeFromCart = (product) =>
    dispatch({
      type: CART_ACTION_TYPES.REMOVE_FROM_CART,
      payload: product,
    });

  const clearCart = () =>
    dispatch({
      type: CART_ACTION_TYPES.CLEAR_CART,
    });

  return { state, addToCart, removeFromCart, clearCart };
}

export function CartProvider({ children }) {
  const { state, addToCart, removeFromCart, clearCart } = useCartReducer();
  // const [cart, setCart] = useState([]);

  // const addToCart = (product) => {
  //   const productInCartIndex = cart.findIndex((item) => item.id === product.id);

  //   if (productInCartIndex >= 0) {
  //     const newCart = structuredClone(cart);
  //     newCart[productInCartIndex].quantity += 1;
  //     return setCart(newCart);
  //   }

  //   setCart((prevSate) => [
  //     ...prevSate,
  //     {
  //       ...product,
  //       quantity: 1,
  //     },
  //   ]);
  // };

  // const clearCart = () => {
  //   setCart([]);
  // };

  // const removeFromCart = (product) => {
  //   setCart((prevState) => prevState.filter((item) => item.id !== product.id));
  // };

  return (
    <CartContext.Provider
      value={{
        cart: state,
        addToCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
