import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { globalDataSlice, IGlobalData } from "./globalDataSlice";

export interface IFolder
  extends Pick<
    IGlobalData,
    "id" | "type" | "name" | "icon" | "children" | "isFocused" | "isOpened"
  > {
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  isMaximized: boolean;
  prevState: {
    size: { width: number; height: number };
    position: { x: number; y: number };
  };
}

type InitialState = {
  openFolders: IFolder[];
  nextZIndex: number;
};

const defaultValues: InitialState = {
  openFolders: [],
  nextZIndex: 10,
};

const initialState: InitialState = defaultValues;

export const openFoldersSlice = createSlice({
  name: "openFolders",
  initialState,
  reducers: {
    openFolder: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;

      // Check if folder is already open
      if (state.openFolders.some((folder) => folder.id === id)) {
        // Just bring it to front if already open
        const folderIndex = state.openFolders.findIndex(
          (folder) => folder.id === id,
        );
        if (folderIndex !== -1) {
          state.openFolders[folderIndex].zIndex = state.nextZIndex;
          state.nextZIndex += 1;
        }
        return;
      }

      // Generate random offset between 80-150px
      const randomOffset = () => Math.floor(Math.random() * 70) + 80;

      const folder = globalDataSlice
        .getInitialState()
        .data.find((folder) => folder.id === id);

      // Create a new folder with the next available z-index
      console.log(folder);
      const newFolder: IFolder = {
        type: folder?.type || "folder",
        id,
        position: { x: randomOffset(), y: randomOffset() },
        size: { width: 640, height: 640 },
        zIndex: state.nextZIndex,
        isMaximized: false,
        isOpened: true,
        isFocused: true,
        name: folder?.name || "New Folder",
        icon: folder?.icon || "src/assets/icons/file-explorer.png",
        children: folder?.children || [],
        prevState: {
          size: { width: 640, height: 640 },
          position: { x: randomOffset(), y: randomOffset() },
        },
      };

      state.openFolders.push(newFolder);
      state.nextZIndex += 1;
    },

    closeFolder: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const folderIndex = state.openFolders.findIndex(
        (folder) => folder.id === id,
      );
      if (folderIndex !== -1) {
        state.openFolders.splice(folderIndex, 1);
      }
    },

    bringFolderToFront: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const folderIndex = state.openFolders.findIndex(
        (folder) => folder.id === id,
      );

      if (folderIndex !== -1) {
        // Update the z-index of the clicked folder
        state.openFolders[folderIndex].zIndex = state.nextZIndex;
        state.nextZIndex += 1;
      }
    },

    updateFolderPosition: (
      state,
      action: PayloadAction<{ id: string; position: { x: number; y: number } }>,
    ) => {
      const { id, position } = action.payload;
      const folderIndex = state.openFolders.findIndex(
        (folder) => folder.id === id,
      );
      if (folderIndex !== -1) {
        const width = state.openFolders[folderIndex].size.width;
        const sanitizedPosition = {
          x: Math.max(0, Math.min(position.x, window.innerWidth - width)),
          y: Math.max(0, Math.min(position.y, window.innerHeight - 30)),
        };
        state.openFolders[folderIndex].position = sanitizedPosition;
      }
    },

    updateFolderSize: (
      state,
      action: PayloadAction<{
        id: string;
        size: { width: number; height: number };
      }>,
    ) => {
      const { id, size } = action.payload;
      const folderIndex = state.openFolders.findIndex(
        (folder) => folder.id === id,
      );

      if (folderIndex !== -1) {
        state.openFolders[folderIndex].size = size;
      }
    },

    maximizeFolder: (
      state,
      action: PayloadAction<{
        id: string;
        size: { width: number; height: number };
        position: { x: number; y: number };
      }>,
    ) => {
      const { id, size, position } = action.payload;
      const folderIndex = state.openFolders.findIndex(
        (folder) => folder.id === id,
      );

      if (folderIndex !== -1) {
        const folder = state.openFolders[folderIndex];

        if (!folder.isMaximized) {
          // Save current state before maximizing
          folder.prevState = {
            size: {
              width: folder.size?.width || 0,
              height: folder.size?.height || 0,
            },
            position: {
              x: folder.position?.x || 0,
              y: folder.position?.y || 0,
            },
          };

          // Maximize
          folder.size = size;
          folder.position = position;
          folder.isMaximized = true;

          // Bring to front
          folder.zIndex = state.nextZIndex;
          state.nextZIndex += 1;
        }
      }
    },

    restoreFolder: (state, action: PayloadAction<{ id: string }>) => {
      const { id } = action.payload;
      const folderIndex = state.openFolders.findIndex(
        (folder) => folder.id === id,
      );

      if (folderIndex !== -1) {
        const folder = state.openFolders[folderIndex];

        if (folder.isMaximized && folder.prevState) {
          // Restore previous size and position
          folder.size = folder.prevState.size;
          folder.position = folder.prevState.position;
          folder.isMaximized = false;
        }
      }
    },

    resetGlobalDataSlice: (state) => {
      Object.assign(state, defaultValues);
    },
  },
});

export const {
  openFolder,
  closeFolder,
  bringFolderToFront,
  updateFolderPosition,
  updateFolderSize,
  maximizeFolder,
  restoreFolder,
  resetGlobalDataSlice,
} = openFoldersSlice.actions;

export default openFoldersSlice.reducer;
