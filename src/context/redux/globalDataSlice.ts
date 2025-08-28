import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type GlobalDataType = "folder" | "file";

export interface IGlobalDataCommon {
  id: string;
  name: string;
  icon: string;
  isOpened: boolean;
  isFocused: boolean;
  isPinnedToTaskbar: boolean;
  isDesktopIconSelected: boolean;
}

export interface IGlobalDataFolder extends IGlobalDataCommon {
  type: "folder";
  children?: IGlobalData[] | [];
}

export interface IGlobalDataFile extends IGlobalDataCommon {
  type: "file";
  children?: never;
}

export type IGlobalData = IGlobalDataFolder | IGlobalDataFile;

type InitialState = {
  data: IGlobalData[];
};

const defaultValues: InitialState = {
  data: [
    {
      type: "folder",
      id: "folder-1",
      name: "Folder 1",
      icon: "src/assets/icons/file_explorer_icon.png",
      children: [
        {
          type: "file",
          id: "file-1",
          name: "File 1",
          icon: "src/assets/icons/pdf.png",
          isOpened: false,
          isFocused: false,
          isPinnedToTaskbar: false,
          isDesktopIconSelected: false,
        },
      ],
      isOpened: false,
      isFocused: false,
      isPinnedToTaskbar: false,
      isDesktopIconSelected: false,
    },
    {
      type: "folder",
      id: "folder-2",
      name: "Folder 2",
      icon: "src/assets/icons/file_explorer_icon.png",
      children: [
        {
          type: "file",
          id: "file-2",
          name: "File 2",
          icon: "src/assets/icons/pdf.png",
          isOpened: false,
          isFocused: false,
          isPinnedToTaskbar: false,
          isDesktopIconSelected: false,
        },
      ],
      isOpened: false,
      isFocused: false,
      isPinnedToTaskbar: false,
      isDesktopIconSelected: false,
    },
    {
      type: "folder",
      id: "folder-3",
      name: "Folder 3",
      icon: "src/assets/icons/file_explorer_icon.png",
      children: [],
      isOpened: false,
      isFocused: false,
      isPinnedToTaskbar: false,
      isDesktopIconSelected: false,
    },
  ],
};

const initialState: InitialState = defaultValues;

export const globalDataSlice = createSlice({
  name: "globalData",
  initialState,
  reducers: {
    setOpen: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.data.forEach((item) => {
        item.isFocused = false;
        if (item.id === id) {
          item.isOpened = true;
          item.isFocused = true;
        }
      });
    },

    setClose: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.data.forEach((item) => {
        if (item.id === id) {
          item.isOpened = false;
          item.isFocused = false;
        }
      });
    },

    setFocus: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.data.forEach((item) => {
        item.isFocused = item.id === id;
      });
    },

    setUnfocus: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.data.forEach((item) => {
        if (item.id === id) {
          item.isFocused = false;
        }
      });
    },

    setDesktopIconSelected: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      state.data.forEach((item) => {
        item.isDesktopIconSelected = item.id === id;
      });
    },

    setDesktopIconUnselected: (
      state,
      action: PayloadAction<{ id: string }>,
    ) => {
      const { id } = action.payload;
      state.data.forEach((item) => {
        if (item.id === id) {
          item.isDesktopIconSelected = false;
        }
      });
    },

    resetGlobalDataSlice: (state) => {
      Object.assign(state, defaultValues);
    },
  },
});

export const {
  setOpen,
  setClose,
  setFocus,
  setUnfocus,
  setDesktopIconSelected,
  setDesktopIconUnselected,
  resetGlobalDataSlice,
} = globalDataSlice.actions;

export default globalDataSlice.reducer;
