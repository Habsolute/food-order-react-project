import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCardState = {
  items: [],
  totalAmount: 0,
};

function CardReducer(state, action) {
  if (action.type === "ADD") {
    const updatedItems = state.items.concat(action.item);

    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  return defaultCardState;
}

function CartProvider(props) {
  const [cartState, dispatchCartAction] = useReducer(
    CardReducer,
    defaultCardState
  );

  const addItemCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const removeItemCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemCartHandler,
    remoceItem: removeItemCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;