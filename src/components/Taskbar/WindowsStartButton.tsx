import { IoLogoWindows } from "react-icons/io"
import { useDispatch } from "react-redux"
import { toggleWindowsStartMenuOpen } from "@/context/redux/windowsStartMenuSlice"

const WindowsStartButton = () => {
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(toggleWindowsStartMenuOpen())
  }

  return (
    <button
      id="windows-start-button"
      onClick={handleClick}
      className="group relative flex h-full w-12 cursor-default items-center justify-center duration-75 hover:bg-[rgb(var(--taskbar-icon-background-color-hover))] active:bg-[rgb(var(--taskbar-icon-background-color-active))]"
    >
      <IoLogoWindows className="start-icon icon-image h-[1.25rem] w-[1.25rem] text-[rgb(var(--taskbar-icon-color))] group-hover:text-[rgb(var(--accent-color))]" />
    </button>
  )
}

export default WindowsStartButton
