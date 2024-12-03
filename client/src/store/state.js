// Code below will help access and update global state and store from anywhere in the application
import { createSlice } from '@reduxjs/toolkit';

// Retrieve the initial state from localStorage, or use an empty array if none exists
export const loadCartFromLocalStorage = () => {
  const savedCart = localStorage.getItem("cart");
  return savedCart ? JSON.parse(savedCart) : [];
};

export const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
}

// This function is for changing items to equal what is being passed into when there is setItems
export const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.find(
        (item) => item.id === action.payload.id && item.variant === action.payload.variant
      );
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.push(action.payload);
      }
      saveCartToLocalStorage(state);
    },

    removeFromCart: (state, action) => {
      const updatedCart = state.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(updatedCart); // Save updated cart to localStorage
      return updatedCart;
    },
    
    clearCart: (state) => {
      saveCartToLocalStorage([]); // Clears cart in localStorage
      return [];
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;