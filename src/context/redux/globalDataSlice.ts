import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { AppDispatch, IRootState } from "@/app/store"
import {
  CHROME_ICON,
  CREO_ICON,
  EL_NOVA_LABS_ICON,
  ENGINEERHUB_ICON,
  FILE_EXPLORE_ICON,
  FOLDER_ICON,
  PDF_ICON,
  SOFTBOARD_LITE_ICON,
  THIS_PC_ICON,
  TRELLO_ICON,
  TWIZZR_ICON
} from "@/assets/assets"
import { closeDisplay, openDisplay } from "./displaySlice"
import {
  addItemToTaskbarSequence,
  removeItemFromTaskbarSequence
} from "./taskbarSlice"

export const enum GlobalDataType {
  FOLDER = "folder",
  FILE = "file",
  FILE_LINK = "file-link"
}

export interface IGlobalDataCommon {
  id: string
  name: string
  icon: string
  taskbarIcon: string
  isPinnedToTaskbar: boolean
  isFocused: boolean
  parent: string
  isOpened: boolean
}

export interface IGlobalDataFolder extends IGlobalDataCommon {
  type: GlobalDataType.FOLDER
  children: string[]
  url?: never
}

export interface IGlobalDataFile extends IGlobalDataCommon {
  type: GlobalDataType.FILE
  children?: never
  url?: string
}

export interface IGlobalDataFileLink extends IGlobalDataCommon {
  type: GlobalDataType.FILE_LINK
  children?: never
  url: string
}

export type GlobalDataItem =
  | IGlobalDataFolder
  | IGlobalDataFile
  | IGlobalDataFileLink

export type GlobalData = Record<string, GlobalDataItem>

// NOTE: Each value in globalData must be a individual identity before being added as a children or a parent.
const defaultValues: GlobalData = {
  "this-pc-folder": {
    id: "this-pc-folder",
    type: GlobalDataType.FOLDER,
    name: "This PC",
    icon: THIS_PC_ICON,
    taskbarIcon: FILE_EXPLORE_ICON,
    isPinnedToTaskbar: true,
    isOpened: false,
    isFocused: false,
    children: ["resume-file", "projects-folder", "experience-folder"],
    parent: ""
  },
  "resume-folder": {
    id: "resume-folder",
    type: GlobalDataType.FOLDER,
    name: "Resume",
    icon: FOLDER_ICON,
    taskbarIcon: FILE_EXPLORE_ICON,
    isPinnedToTaskbar: true,
    isOpened: false,
    isFocused: false,
    children: ["resume-file"],
    parent: "this-pc-folder"
  },
  "resume-file": {
    id: "resume-file",
    type: GlobalDataType.FILE,
    name: "Resume",
    icon: PDF_ICON,
    taskbarIcon: PDF_ICON,
    isPinnedToTaskbar: false,
    isOpened: false,
    isFocused: false,
    parent: "resume-folder",
    url: "https://drive.google.com/file/d/1gaepCoxAr6KRVMysEyee7dugIz-LjYf6/preview?usp=sharing"
  },
  "projects-folder": {
    id: "projects-folder",
    type: GlobalDataType.FOLDER,
    name: "Projects",
    icon: FOLDER_ICON,
    taskbarIcon: FILE_EXPLORE_ICON,
    isPinnedToTaskbar: false,
    isOpened: false,
    isFocused: false,
    parent: "this-pc-folder",
    children: [
      "creo-file-link",
      "e-commerce-website-file-link",
      "trello-clone-file-link"
    ]
  },
  "e-commerce-website-file-link": {
    id: "e-commerce-website-file-link",
    type: GlobalDataType.FILE_LINK,
    name: "E-commerce Website",
    icon: CHROME_ICON,
    taskbarIcon: CHROME_ICON,
    isPinnedToTaskbar: false,
    isOpened: false,
    isFocused: false,
    parent: "projects-folder",
    url: "https://minimalistic-e-commerce.vercel.app/"
  },
  "creo-file-link": {
    id: "creo-file-link",
    type: GlobalDataType.FILE_LINK,
    name: "Creo Website",
    icon: CREO_ICON,
    taskbarIcon: CREO_ICON,
    isPinnedToTaskbar: false,
    isOpened: false,
    isFocused: false,
    parent: "projects-folder",
    url: "https://letscreo.in/"
  },
  "trello-clone-file-link": {
    id: "trello-clone-file-link",
    type: GlobalDataType.FILE_LINK,
    name: "Trello clone",
    icon: TRELLO_ICON,
    taskbarIcon: TRELLO_ICON,
    isPinnedToTaskbar: false,
    isOpened: false,
    isFocused: false,
    parent: "projects-folder",
    url: "https://github.com/SwapnilRaj1708/trello-clone"
  },
  "experience-folder": {
    id: "experience-folder",
    type: GlobalDataType.FOLDER,
    name: "Experiences",
    icon: FOLDER_ICON,
    taskbarIcon: FILE_EXPLORE_ICON,
    isPinnedToTaskbar: false,
    isOpened: false,
    isFocused: false,
    children: [
      "el-nova-labs-file-link",
      "softboard-lite-file-link",
      "twizzr-file-link",
      "engineerhub-file-link"
    ],
    parent: "this-pc-folder"
  },
  "engineerhub-file-link": {
    id: "engineerhub-file-link",
    type: GlobalDataType.FILE_LINK,
    name: "engineerHUB",
    icon: ENGINEERHUB_ICON,
    taskbarIcon: ENGINEERHUB_ICON,
    isPinnedToTaskbar: false,
    isOpened: false,
    isFocused: false,
    parent: "experience-folder",
    url: "https://engineerhub.in/"
  },
  "softboard-lite-file-link": {
    id: "softboard-lite-file-link",
    type: GlobalDataType.FILE_LINK,
    name: "Softboard Lite",
    icon: SOFTBOARD_LITE_ICON,
    taskbarIcon: SOFTBOARD_LITE_ICON,
    isPinnedToTaskbar: false,
    isOpened: false,
    isFocused: false,
    parent: "experience-folder",
    url: "https://sbl.elnovalabs.com/"
  },
  "el-nova-labs-file-link": {
    id: "el-nova-labs-file-link",
    type: GlobalDataType.FILE_LINK,
    name: "EL Nova Labs",
    icon: EL_NOVA_LABS_ICON,
    taskbarIcon: EL_NOVA_LABS_ICON,
    isPinnedToTaskbar: false,
    isOpened: false,
    isFocused: false,
    parent: "experience-folder",
    url: "https://elnovalabs.com/"
  },
  "twizzr-file-link": {
    id: "twizzr-file-link",
    type: GlobalDataType.FILE_LINK,
    name: "Twizzr",
    icon: TWIZZR_ICON,
    taskbarIcon: TWIZZR_ICON,
    isPinnedToTaskbar: false,
    isOpened: false,
    isFocused: false,
    parent: "experience-folder",
    url: "https://twizzr.in/"
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

    pinItemToTaskbar: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload
      state[id].isPinnedToTaskbar = true
    },

    unpinItemFromTaskbar: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload
      state[id].isPinnedToTaskbar = false
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
    if (item.type === GlobalDataType.FILE_LINK) {
      window.open(item.url, "_blank")
    } else {
      dispatch(openItem({ id }))
      dispatch(openDisplay({ id }))
      dispatch(addItemToTaskbarSequence({ id }))
    }
  }

export const closeItemThunk =
  ({ id }: { id: string }) =>
  (dispatch: AppDispatch) => {
    dispatch(closeItem({ id }))
    dispatch(closeDisplay({ id }))
    dispatch(removeItemFromTaskbarSequence({ id }))
  }

export const {
  openItem,
  closeItem,
  focusItem,
  unfocusItem,
  resetGlobalDataSlice
} = globalDataSlice.actions

export default globalDataSlice.reducer
