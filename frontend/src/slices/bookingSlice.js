import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  address: [],
  totalAmount: '',
  status: '',
  phoneNumber: '',
  riderDelete: false,
  userDelete: false,
};

const bookingSlice = createSlice({
  name: 'booking',
  initialState,
  reducers: {
    setBooking: (state, action) => {
      state.address = action.payload.address;
      state.totalAmount = action.payload.totalAmount;
      state.status = action.payload.status;
      state.phoneNumber = action.payload.phoneNumber;
    },
  },
});

export const { setBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
