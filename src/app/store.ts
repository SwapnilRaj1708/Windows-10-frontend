import { configureStore } from "@reduxjs/toolkit"
import { desktopSlice } from "@/context/redux/desktopSlice"
import { displaySlice } from "@/context/redux/displaySlice"
import { globalDataSlice } from "@/context/redux/globalDataSlice"
import { lockScreenSlice } from "@/context/redux/lockScreenSlice"
import { pinnedTaskbarSlice } from "@/context/redux/pinnedTaskbarSlice"
import { taskbarSlice } from "@/context/redux/taskbarSlice"
import { windowsStartMenuSlice } from "@/context/redux/windowsStartMenuSlice"

const store = configureStore({
  reducer: {
    [globalDataSlice.name]: globalDataSlice.reducer,
    [desktopSlice.name]: desktopSlice.reducer,
    [displaySlice.name]: displaySlice.reducer,
    [taskbarSlice.name]: taskbarSlice.reducer,
    [pinnedTaskbarSlice.name]: pinnedTaskbarSlice.reducer,
    [lockScreenSlice.name]: lockScreenSlice.reducer,
    [windowsStartMenuSlice.name]: windowsStartMenuSlice.reducer
  }
})

export default store

export type IRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
