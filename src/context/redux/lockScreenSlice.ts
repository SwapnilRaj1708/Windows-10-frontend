import { createSlice } from "@reduxjs/toolkit"

type InitialState = {
  initialLoad: boolean
  isLocked: boolean
}

const defaultValues: InitialState = {
  initialLoad: true,
  isLocked: !true
}

const initialState: InitialState = defaultValues

export const lockScreenSlice = createSlice({
  name: "lockScreen",
  initialState,
  reducers: {
    setInitialLoad: (state, action) => {
      state.initialLoad = action.payload
    },
    setIsLocked: (state, action) => {
      state.isLocked = action.payload
    },
    resetLockScreenSlice: state => {
      Object.assign(state, defaultValues)
    }
  }
})

export const { setInitialLoad, setIsLocked, resetLockScreenSlice } =
  lockScreenSlice.actions

export default lockScreenSlice.reducer
