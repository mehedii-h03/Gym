import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Card {
  _id: string;
  number: string;
  name: string;
  expiry: string;
  cvc: string;
}

export interface ActiveCardState {
  activeCard: Card | null;
}

const loadState = (): ActiveCardState => {
  try {
    const serializedState = localStorage.getItem("activeCard");
    if (serializedState === null) {
      return { activeCard: null };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return { activeCard: null };
  }
};

const initialState: ActiveCardState = loadState();

const activeCardSlice = createSlice({
  name: "activeCard",
  initialState,
  reducers: {
    setActiveCard: (state, action: PayloadAction<Card>) => {
      state.activeCard = action.payload;
      localStorage.setItem("activeCard", JSON.stringify(state));
    },
    clearActiveCard: (state) => {
      state.activeCard = null;
      localStorage.removeItem("activeCard");
    },
  },
});

export const { setActiveCard, clearActiveCard } = activeCardSlice.actions;
export default activeCardSlice.reducer;
