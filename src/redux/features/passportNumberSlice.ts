import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const passportSlice = createSlice({
  name: "passport",
  initialState: "",
  reducers: {
    setPassportNumber: (_, action: PayloadAction<string>) => {
      return action.payload;
    },
  },
});

export const { setPassportNumber } = passportSlice.actions;
export default passportSlice.reducer;
