import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/baseApi";
import activeCardReducer from "./features/activeCardSlice";
import authReducer from "./features/authSlice";
import passportReducer from "./features/passportNumberSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
    activeCard: activeCardReducer,
    passport: passportReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("activeCard", JSON.stringify(state.activeCard));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;