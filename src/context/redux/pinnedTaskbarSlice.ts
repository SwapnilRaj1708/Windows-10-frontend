import { createSlice, PayloadAction } from "@reduxjs/toolkit"

// PinnedTaskbar slice is their to only manage the sequence in which apps are being pinned to the taskbar.

const defaultValues: string[] = []

const initialState = defaultValues

export const pinnedTaskbarSlice = createSlice({
  name: "pinnedTaskbar",
  initialState,
  reducers: {
    addItemToPinnedTaskbarSequence: (
      state,
      action: PayloadAction<{ id: string }>
    ) => {
      const { id } = action.payload
      state.push(id)
    },
    removeItemFromPinnedTaskbarSequence: (
      state,
      action: PayloadAction<{ id: string }>
    ) => {
      const { id } = action.payload
      return state.filter(item => item !== id)
    },
    resetPinnedTaskbarSequence: state => {
      Object.assign(state, defaultValues)
    }
  }
})

export const {
  addItemToPinnedTaskbarSequence,
  removeItemFromPinnedTaskbarSequence,
  resetPinnedTaskbarSequence
} = pinnedTaskbarSlice.actions

export default pinnedTaskbarSlice.reducer
