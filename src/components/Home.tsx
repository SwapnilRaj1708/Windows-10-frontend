import { useSelector } from "react-redux"
import { IRootState } from "@/app/store"
import { WALLPAPER_1 } from "@/assets/assets"
// import fileExplorerIcon from "@/assets/icons/file-explorer.png"
// import ContextMenu from "./ContextMenu/ContextMenu"
import DesktopIcons from "./Desktop/DesktopIcons"
import DisplayContainer from "./Display/DisplayContainer"
import Taskbar from "./Taskbar/Taskbar"

export default function Home() {
  const { isLocked } = useSelector((state: IRootState) => state.lockScreen)

  // const contextMenuItems = [
  //   {
  //     label: "View",
  //     children: [
  //       {
  //         label: "View",
  //         onClick: () => console.log("View Clicked"),
  //         icon: fileExplorerIcon
  //       }
  //     ]
  //   },
  //   {
  //     label: "Sort by",
  //     children: [
  //       {
  //         label: "View",
  //         onClick: () => console.log("View Clicked"),
  //         icon: fileExplorerIcon
  //       }
  //     ]
  //   },
  //   {
  //     label: "Refresh",
  //     children: [
  //       {
  //         label: "View",
  //         onClick: () => console.log("View Clicked"),
  //         icon: fileExplorerIcon
  //       }
  //     ]
  //   },
  //   { divider: true },
  //   {
  //     label: "Paste"
  //     // onClick: () => console.log("Paste clicked"),
  //   },
  //   { divider: true },
  //   {
  //     label: "New",
  //     children: [
  //       {
  //         label: "View",
  //         onClick: () => console.log("View Clicked"),
  //         icon: fileExplorerIcon
  //       }
  //     ]
  //   },
  //   { divider: true },
  //   {
  //     label: "Display settings",
  //     // onClick: () => console.log("Display settings clicked"),
  //     icon: fileExplorerIcon
  //   },
  //   {
  //     label: "Personalize",
  //     // onClick: () => console.log("Personalize clicked"),
  //     icon: fileExplorerIcon
  //   }
  // ]

  return !isLocked ? (
    <main
      className="relative h-screen max-h-screen w-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${WALLPAPER_1})`
      }}
    >
      {/* <ContextMenu items={contextMenuItems} /> */}
      <Taskbar />
      <DesktopIcons />
      <DisplayContainer />
    </main>
  ) : (
    <main className="relative h-screen max-h-screen w-screen bg-black" />
  )
}
