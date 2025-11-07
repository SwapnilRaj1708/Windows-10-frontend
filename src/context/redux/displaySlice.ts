import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { GlobalDataItem } from "./globalDataSlice"

export interface IDisplay extends Pick<GlobalDataItem, "id"> {
  position: { x: number; y: number }
  size: { width: number; height: number }
  zIndex: number
  isMaximized: boolean
  prevState: {
    size: { width: number; height: number }
    position: { x: number; y: number }
  }
}

type InitialState = {
  openItems: IDisplay[]
  nextZIndex: number
}

const defaultValues: InitialState = {
  openItems: [],
  nextZIndex: 10
}

const initialState: InitialState = defaultValues

export const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    openDisplay: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload

      // Check if display is already open
      if (state.openItems.some(display => display.id === id)) {
        // Just bring it to front if already open
        displaySlice.caseReducers.bringDisplayToFront(state, {
          payload: { id },
          type: "bringDisplayToFront"
        })
        return
      }

      // Generate random offset between 80-150px
      const randomOffset = () => Math.floor(Math.random() * 70) + 80

      // Create a new display with the next available z-index
      const xOffset = randomOffset()
      const yOffset = randomOffset()
      const newDisplay: IDisplay = {
        id,
        position: { x: xOffset, y: yOffset },
        size: { width: 640, height: 640 },
        zIndex: state.nextZIndex,
        isMaximized: false,
        prevState: {
          size: { width: 640, height: 640 },
          position: { x: xOffset, y: yOffset }
        }
      }

      state.openItems.push(newDisplay)
      state.nextZIndex += 1
    },

    closeDisplay: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload
      const displayIndex = state.openItems.findIndex(
        display => display.id === id
      )
      if (displayIndex !== -1) {
        state.openItems.splice(displayIndex, 1)
      }
    },

    bringDisplayToFront: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload
      const displayIndex = state.openItems.findIndex(
        display => display.id === id
      )

      if (displayIndex !== -1) {
        // Update the z-index of the clicked display
        state.openItems[displayIndex].zIndex = state.nextZIndex
        state.nextZIndex += 1
      }
    },

    updateDisplayPosition: (
      state,
      action: PayloadAction<{ id: string; position: { x: number; y: number } }>
    ) => {
      const { id, position } = action.payload
      const displayIndex = state.openItems.findIndex(
        display => display.id === id
      )
      if (displayIndex !== -1) {
        const width = state.openItems[displayIndex].size.width
        const sanitizedPosition = {
          x: Math.max(0, Math.min(position.x, window.innerWidth - width)), // TODO: Update this to consider mouse as well
          y: Math.max(0, Math.min(position.y, window.innerHeight - 30))
        }
        state.openItems[displayIndex].position = sanitizedPosition

        displaySlice.caseReducers.bringDisplayToFront(state, {
          payload: { id },
          type: "bringDisplayToFront"
        })
      }
    },

    updateDisplaySize: (
      state,
      action: PayloadAction<{
        id: string
        size: { width: number; height: number }
      }>
    ) => {
      const { id, size } = action.payload
      const displayIndex = state.openItems.findIndex(
        display => display.id === id
      )

      if (displayIndex !== -1) {
        state.openItems[displayIndex].size = size

        displaySlice.caseReducers.bringDisplayToFront(state, {
          payload: { id },
          type: "bringDisplayToFront"
        })
      }
    },

    maximizeDisplay: (
      state,
      action: PayloadAction<{
        id: string
        size: { width: number; height: number }
        position: { x: number; y: number }
      }>
    ) => {
      const { id, size, position } = action.payload
      const displayIndex = state.openItems.findIndex(
        display => display.id === id
      )

      if (displayIndex !== -1) {
        const display = state.openItems[displayIndex]

        if (!display.isMaximized) {
          // Save current state before maximizing
          display.prevState = {
            size: {
              width: display.size.width,
              height: display.size.height
            },
            position: {
              x: display.position.x,
              y: display.position.y
            }
          }

          // Maximize
          display.size = size
          display.position = position
          display.isMaximized = true

          displaySlice.caseReducers.bringDisplayToFront(state, {
            payload: { id },
            type: "bringDisplayToFront"
          })
        }
      }
    },

    restoreDisplay: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload
      const displayIndex = state.openItems.findIndex(
        display => display.id === id
      )

      if (displayIndex !== -1) {
        const display = state.openItems[displayIndex]

        if (display.isMaximized && display.prevState) {
          // Restore previous size and position
          display.size = display.prevState.size
          display.position = display.prevState.position
          display.isMaximized = false
        }

        displaySlice.caseReducers.bringDisplayToFront(state, {
          payload: { id },
          type: "bringDisplayToFront"
        })
      }
    },

    resetGlobalDataSlice: state => {
      Object.assign(state, defaultValues)
    }
  }
})

export const {
  openDisplay,
  closeDisplay,
  bringDisplayToFront,
  updateDisplayPosition,
  updateDisplaySize,
  maximizeDisplay,
  restoreDisplay,
  resetGlobalDataSlice
} = displaySlice.actions

export default displaySlice.reducer
