import { configureStore } from "@reduxjs/toolkit";
import { taskbarSlice } from "../features/taskbar/taskbarSlice";
import { lockScreenSlice } from "@/context/redux/lockScreenSlice";

const store = configureStore({
  reducer: {
    [taskbarSlice.name]: taskbarSlice.reducer,
    [lockScreenSlice.name]: lockScreenSlice.reducer,
  },
});

export default store;

export type IRootState = ReturnType<typeof store.getState>;
