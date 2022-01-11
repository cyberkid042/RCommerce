import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  quantity: 0,
  total: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, actions) => {
      state.quantity += 1;
      state.products.push(actions.payload);
      state.total += actions.payload.price * actions.payload.quantity;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addProduct } = cartSlice.actions;

export default cartSlice.reducer;
