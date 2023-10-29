import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cart: [],

  // cart: [
  //   {
  //     pizzaId: 12,
  //     name: 'Mediterranean',
  //     quantity: 2,
  //     unitPrice: 16,
  //     totalPrice: 32,
  //   },
  // ],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action) {
      // payload = newItem
      // mutable
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      // payload = pizzaId
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      // payload = pizzaId
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (store) => store.cart.cart;

export const getTotalCartQuantity = (store) =>
  store.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (store) =>
  store.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

// Optional chaining (?.)
// The optional chaining (?.) operator accesses an object's property or calls a function. If the object accessed or function called using this operator is undefined or null, the expression short circuits and evaluates to undefined instead of throwing an error.
// Nullish coalescing operator (??)
// The nullish coalescing (??) operator is a logical operator that returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.
export const getCurrentQuantityById = (id) => (store) =>
  store.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

// reselect: overcome performance issues
// To use it, you will need to define your selectors
// for cartSlice

// const getCartItems = (state) => state.cart.cart

// export const getCart = createSelector (
//  [getCartItems],
//  (cart) => cart
// );

// export const getTotalCartQuantity = createSelector(
//  [getCartItems],
//  (cartItems) => cartItems.reduce((sumQuantity, item) => sumQuantity + item.quantity, 0),
// );

// export const getTotalPrice = createSelector(
//  [getCartItems],
//  (cartItems) => cartItems.reduce((sumPrice, item) => sumPrice + item.totalPrice, 0),
// );

// export const getCurrentQuantityById = (id) =>
//  createSelector(
//  [getCartItems],
//  (cartItems) => cartItems.find((item) => item.pizzaId === id)?.quantity ?? 0,
//   );

// and for the userSlice

// const getUsername = (state) => state.user.username;

// export const getUsernameSelector = createSelector(
//   [getUsername],
//   (username) => username,
// );
