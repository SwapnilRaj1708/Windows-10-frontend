import { useSelector } from "react-redux"
import type { IRootState } from "@/app/store"
import DesktopIcon from "./DesktopIcon"

export default function DesktopIcons() {
  const desktopIcons = useSelector((state: IRootState) => state.desktop)

  return (
    <div className="absolute flex h-full max-h-screen w-full flex-col flex-wrap content-start items-start justify-start gap-y-4 px-[0.0625rem] py-[0.3125rem] pb-[var(--taskbar-height)]">
      {desktopIcons.map(icon => (
        <DesktopIcon key={icon} id={icon} />
      ))}
    </div>
  )
}
