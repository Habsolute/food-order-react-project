import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCardState = {
  items: [],
  totalAmount: 0,
};

function CardReducer(state, action) {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.item[existingCartItemIndex];

    let updatedItem;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItem = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      const updatedItems = state.items.concat(action.item);
    }

    // const updatedTotalAmount =
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

  /**
   * Add un item in the cart
   */
  const addItemCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  /**
   * remove un item of the card by id
   */
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
