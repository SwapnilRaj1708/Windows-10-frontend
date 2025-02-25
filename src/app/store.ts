import { configureStore } from "@reduxjs/toolkit";
import { taskbarSlice } from "../features/taskbar/taskbarSlice";
import { lockScreenSlice } from "@/context/redux/lockScreenSlice";
import { windowsStartMenuSlice } from "@/context/redux/windowsStartMenuSlice";

const store = configureStore({
  reducer: {
    [taskbarSlice.name]: taskbarSlice.reducer,
    [lockScreenSlice.name]: lockScreenSlice.reducer,
    [windowsStartMenuSlice.name]: windowsStartMenuSlice.reducer,
  },
});

export default store;

export type IRootState = ReturnType<typeof store.getState>;
