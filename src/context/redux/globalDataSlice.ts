import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch, IRootState } from "@/app/store"
import {
  CHROME_ICON,
  FILE_EXPLORE_ICON,
  FOLDER_ICON,
  PDF_ICON,
  THIS_PC_ICON
} from "@/assets/assets"
import { closeDisplay, openDisplay } from "./displaySlice"

export type GlobalDataType = "folder" | "file" | "file-link"

export interface IGlobalDataCommon {
  id: string
  name: string
  icon: string
  taskbarIcon: string
  isFocused: boolean
  parent: string
  isOpened: boolean
}

export interface IGlobalDataFolder extends IGlobalDataCommon {
  type: "folder"
  children: string[]
  url?: never
}

export interface IGlobalDataFile extends IGlobalDataCommon {
  type: "file"
  children?: never
  url?: string
}

export interface IGlobalDataFileLink extends IGlobalDataCommon {
  type: "file-link"
  children?: never
  url: string
}

export type GlobalDataItem =
  | IGlobalDataFolder
  | IGlobalDataFile
  | IGlobalDataFileLink

export type GlobalData = Record<string, GlobalDataItem>

// NOTE: Each value in globalData must a individual identity before being added as a children or a parent.
const defaultValues: GlobalData = {
  "this-pc-folder": {
    id: "this-pc-folder",
    type: "folder",
    name: "This PC",
    icon: THIS_PC_ICON,
    taskbarIcon: FILE_EXPLORE_ICON,
    isOpened: false,
    isFocused: false,
    children: ["resume-folder"],
    parent: ""
  },
  "resume-folder": {
    id: "resume-folder",
    type: "folder",
    name: "Resume",
    icon: FOLDER_ICON,
    taskbarIcon: FILE_EXPLORE_ICON,
    isOpened: false,
    isFocused: false,
    children: ["resume-file"],
    parent: "this-pc-folder"
  },
  "resume-file": {
    id: "resume-file",
    type: "file",
    name: "Resume",
    icon: PDF_ICON,
    taskbarIcon: PDF_ICON,
    isOpened: false,
    isFocused: false,
    parent: "resume-folder",
    url: "https://drive.google.com/file/d/1gaepCoxAr6KRVMysEyee7dugIz-LjYf6/preview?usp=sharing"
  },
  "projects-folder": {
    id: "projects",
    type: "folder",
    name: "Projects",
    icon: FOLDER_ICON,
    taskbarIcon: FILE_EXPLORE_ICON,
    isOpened: false,
    isFocused: false,
    parent: "this-pc-folder",
    children: ["e-commerce-website-file-link"]
  },
  "e-commerce-website-file-link": {
    id: "e-commerce-website-file-link",
    type: "file-link",
    name: "E-commerce Website",
    icon: CHROME_ICON,
    taskbarIcon: CHROME_ICON,
    isOpened: false,
    isFocused: false,
    parent: "projects-folder",
    url: "https://minimalistic-e-commerce.vercel.app/"
  }
}

const initialState = defaultValues

export const globalDataSlice = createSlice({
  name: "globalData",
  initialState,
  reducers: {
    openItem: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload
      state[id].isOpened = true
      state[id].isFocused = true
    },

    closeItem: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload
      state[id].isOpened = false
      state[id].isFocused = false
    },

    focusItem: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload
      state[id].isFocused = true
    },

    unfocusItem: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload
      state[id].isFocused = false
    },

    resetGlobalDataSlice: state => {
      Object.assign(state, defaultValues)
    }
  }
})

export const openItemThunk =
  ({ id }: { id: string }) =>
  (dispatch: AppDispatch, getState: () => IRootState) => {
    const item = getState().globalData[id]
    if (!item) return
    if (item.type === "file-link") {
      window.open(item.url, "_blank")
    } else {
      dispatch(openItem({ id }))
      dispatch(openDisplay({ id, item }))
    }
  }

export const closeItemThunk =
  ({ id }: { id: string }) =>
  (dispatch: AppDispatch) => {
    dispatch(closeItem({ id }))
    dispatch(closeDisplay({ id }))
  }

export const {
  openItem,
  closeItem,
  focusItem,
  unfocusItem,
  resetGlobalDataSlice
} = globalDataSlice.actions

export default globalDataSlice.reducer
