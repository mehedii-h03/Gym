import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../firebase/config";
import { signInWithEmailAndPassword, signOut, UserCredential } from "firebase/auth";
import { setUser, setLoading, setError, logout } from "./authSlice";

interface LoginCredentials {
  email: string;
  password: string;
}

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginCredentials, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch(setUser(userCredential.user));
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      dispatch(setError(errorMessage));
      throw error;
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error: unknown) {
      const errorMessage = getErrorMessage(error);
      dispatch(setError(errorMessage));
      throw error;
    }
  }
);