import { createSlice } from "@reduxjs/toolkit"

const defaultValues: string[] = [
  "this-pc-folder",
  "resume-folder",
  "resume-file",
  "projects-folder"
]

const initialState = defaultValues

export const desktopSlice = createSlice({
  name: "desktop",
  initialState,
  reducers: {
    resetDesktopSlice: state => {
      Object.assign(state, defaultValues)
    }
  }
})

export const { resetDesktopSlice } = desktopSlice.actions

export default desktopSlice.reducer
