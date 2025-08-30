import { createSlice } from "@reduxjs/toolkit"

const defaultValues: string[] = [
  "this-pc-folder",
  "resume-folder",
  "resume-file",
  "projects-folder"
]

const initialState = defaultValues

export const taskbarSlice = createSlice({
  name: "taskbar",
  initialState,
  reducers: {
    resetTaskbarSlice: state => {
      Object.assign(state, defaultValues)
    }
  }
})

export const { resetTaskbarSlice } = taskbarSlice.actions

export default taskbarSlice.reducer
