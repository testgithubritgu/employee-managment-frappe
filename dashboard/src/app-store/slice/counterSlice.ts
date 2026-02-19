import { createSlice } from "@reduxjs/toolkit";

export interface CounterSlice {
  value: number;
}

const initialState: CounterSlice = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increament: (state) => {
      state.value += 1;
    },
    decreament: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increament, decreament, incrementByAmount } =
  counterSlice.actions;
export default counterSlice.reducer;
