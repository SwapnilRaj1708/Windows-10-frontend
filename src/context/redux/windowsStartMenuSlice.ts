import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  isWindowsStartMenuOpen: boolean;
};

const defaultValues: InitialState = {
  isWindowsStartMenuOpen: false,
};

const initialState: InitialState = defaultValues;

export const windowsStartMenuSlice = createSlice({
  name: "windowsStartMenu",
  initialState,
  reducers: {
    toggleWindowsStartMenuOpen: (state) => {
      state.isWindowsStartMenuOpen = !state.isWindowsStartMenuOpen;
    },
    setWindowsStartMenuOpen: (state) => {
      state.isWindowsStartMenuOpen = true;
    },
    setWindowsStartMenuClose: (state) => {
      state.isWindowsStartMenuOpen = false;
    },
    resetWindowsStartMenuSlice: (state) => {
      Object.assign(state, defaultValues);
    },
  },
});

export const {
  toggleWindowsStartMenuOpen,
  setWindowsStartMenuOpen,
  setWindowsStartMenuClose,
  resetWindowsStartMenuSlice,
} = windowsStartMenuSlice.actions;

export default windowsStartMenuSlice.reducer;
