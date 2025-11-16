import { useSelector } from "react-redux"
import { IRootState } from "@/app/store"
import { WALLPAPER_1 } from "@/assets/assets"
import ContextMenu from "./ContextMenu/ContextMenu"
import DesktopIcons from "./Desktop/DesktopIcons"
import DisplayContainer from "./Display/DisplayContainer"
import Taskbar from "./Taskbar/Taskbar"

export default function Home() {
  const { isLocked } = useSelector((state: IRootState) => state.lockScreen)

  return !isLocked ? (
    <main
      className="relative h-screen max-h-screen w-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${WALLPAPER_1})`
      }}
    >
      <ContextMenu />
      <Taskbar />
      <DesktopIcons />
      <DisplayContainer />
    </main>
  ) : (
    <main className="relative h-screen max-h-screen w-screen bg-black" />
  )
}
