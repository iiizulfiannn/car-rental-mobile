import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    listOrder: [],
  },
  reducers: {
    setListOrder: (state, action) => {
      state.listOrder = [...action.payload];
    },
  },
});

export const { setListOrder } = orderSlice.actions;

export default orderSlice;
