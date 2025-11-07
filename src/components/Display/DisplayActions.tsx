import { useDispatch } from "react-redux"
import { AppDispatch } from "@/app/store"
import {
  IDisplay,
  maximizeDisplay,
  restoreDisplay
} from "@/context/redux/displaySlice"
import { closeItemThunk, GlobalDataItem } from "@/context/redux/globalDataSlice"

export const MinimizeIcon = ({
  className,
  fill = "white"
}: {
  className?: string
  fill?: string
}) => {
  return (
    <svg
      width="10"
      height="1"
      viewBox="0 0 10 1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M0 0H10V1H0V0Z" fill={fill} />
    </svg>
  )
}

export const WindowedIcon = ({
  className,
  fill = "white"
}: {
  className?: string
  fill?: string
}) => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="0.5" y="2.5" width="7" height="7" stroke={fill} />
      <path d="M10 8H8V7H9V1H3V2H2V0H10V8Z" fill={fill} />
    </svg>
  )
}

export const MaximizedIcon = ({
  className,
  fill = "white"
}: {
  className?: string
  fill?: string
}) => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="0.5" y="0.5" width="9" height="9" stroke={fill} />
    </svg>
  )
}

export const CrossIcon = ({
  className,
  fill = "white"
}: {
  className?: string
  fill?: string
}) => {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="10"
        width="1"
        height="14.14"
        transform="rotate(45 10 0)"
        fill={fill}
      />
      <rect
        y="0.707108"
        width="1"
        height="14.14"
        transform="rotate(-45 0 0.707108)"
        fill={fill}
      />
    </svg>
  )
}

const DisplayActions = ({
  id,
  display,
  displayData
}: {
  id: string
  display: IDisplay
  displayData: GlobalDataItem
}) => {
  const dispatch = useDispatch<AppDispatch>()
  // Handle maximizing/restoring display
  const handleMaximize = () => {
    if (!display) return

    if (display.isMaximized) {
      dispatch(restoreDisplay({ id: display.id }))
    } else {
      // Get taskbar height
      const taskbarHeight = getComputedStyle(document.documentElement)
        .getPropertyValue("--taskbar-height")
        .trim()
      const taskbarHeightPx = Number.parseFloat(taskbarHeight) * 16 // Convert rem to px

      dispatch(
        maximizeDisplay({
          id: display.id,
          size: {
            width: window.innerWidth,
            height: window.innerHeight - taskbarHeightPx
          },
          position: { x: 0, y: 0 }
        })
      )
    }
  }

  // Handle closing display
  const handleClose = () => {
    dispatch(closeItemThunk({ id }))
  }
  return (
    <div className="flex h-full flex-row items-center justify-center pb-[0.0625rem]">
      <div className="flex h-full w-[2.8125rem] items-center justify-center bg-transparent hover:bg-[rgb(26,26,26)] active:bg-[rgb(51,51,51)]">
        <MinimizeIcon
          fill={displayData.isFocused ? "white" : "rgb(128,128,128)"}
        />
      </div>
      <div
        className="flex h-full w-[2.8125rem] items-center justify-center bg-transparent hover:bg-[rgb(26,26,26)] active:bg-[rgb(51,51,51)]"
        onClick={handleMaximize}
      >
        {display.isMaximized ? (
          <WindowedIcon
            fill={displayData.isFocused ? "white" : "rgb(128,128,128)"}
          />
        ) : (
          <MaximizedIcon
            fill={displayData.isFocused ? "white" : "rgb(128,128,128)"}
          />
        )}
      </div>
      <div
        className="flex h-full w-[2.8125rem] items-center justify-center bg-transparent hover:bg-[rgb(232,17,35)] active:bg-[rgb(139,10,20)]"
        onClick={handleClose}
      >
        <CrossIcon
          fill={displayData.isFocused ? "white" : "rgb(128,128,128)"}
        />
      </div>
    </div>
  )
}

export default DisplayActions
