import { configureStore } from "@reduxjs/toolkit";
import { globalDataSlice } from "@/context/redux/globalDataSlice";
import { lockScreenSlice } from "@/context/redux/lockScreenSlice";
import { windowsStartMenuSlice } from "@/context/redux/windowsStartMenuSlice";
import { openFoldersSlice } from "@/context/redux/folderSlice";

const store = configureStore({
  reducer: {
    [globalDataSlice.name]: globalDataSlice.reducer,
    [lockScreenSlice.name]: lockScreenSlice.reducer,
    [windowsStartMenuSlice.name]: windowsStartMenuSlice.reducer,
    [openFoldersSlice.name]: openFoldersSlice.reducer,
  },
});

export default store;

export type IRootState = ReturnType<typeof store.getState>;
