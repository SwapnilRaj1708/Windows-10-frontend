import "./styles.css"
import { useEffect, useId, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { twMerge } from "tailwind-merge"
import { type AppDispatch, IRootState } from "@/app/store"
import { RESIZE_ICON_ICON } from "@/assets/assets"
import {
  bringDisplayToFront,
  restoreDisplay,
  updateDisplayPosition,
  updateDisplaySize
} from "@/context/redux/displaySlice"
import {
  focusItem,
  // GlobalDataType,
  IGlobalDataFolder,
  unfocusItem
} from "@/context/redux/globalDataSlice"
import DisplayActions from "./DisplayActions"
import DisplayChildrenItem from "./DisplayChildrenItem"
import DisplayFolderHeader from "./DisplayFolderHeader"
import DisplayNavigation from "./DisplayNavigation"
import DisplaySideMenu from "./DisplaySideMenu"
import DisplayTaskbar from "./DisplayTaskbar"

export default function FolderDisplay({ id }: { id: string }) {
  const display = useSelector((state: IRootState) =>
    state.display.openItems.find(item => item.id === id)
  )
  const displayData = useSelector(
    (state: IRootState) => state.globalData[id]
  ) as IGlobalDataFolder
  const dispatch = useDispatch<AppDispatch>()
  const uniqueId = useId()
  const displayRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  // Local state for dragging/resizing
  const [resizing, setResizing] = useState(false)
  const [dragging, setDragging] = useState(false)
  const dragPointerStartRef = useRef({ x: 0, y: 0 })
  const dragPositionStartRef = useRef({ x: 0, y: 0 })
  const resizePointerStartRef = useRef({ x: 0, y: 0 })
  const resizeSizeStartRef = useRef({ width: 0, height: 0 })

  useEffect(() => {
    const handleDocumentMouseDown = (event: MouseEvent) => {
      if (
        displayRef.current &&
        !displayRef.current.contains(event.target as Node)
      ) {
        dispatch(unfocusItem({ id }))
      } else {
        dispatch(focusItem({ id }))
      }
    }

    document.addEventListener("click", handleDocumentMouseDown)
    return () => {
      document.removeEventListener("click", handleDocumentMouseDown)
    }
  }, [dispatch, id])

  // Handle clicking on the display to bring it to front
  const handleDisplayClick = () => {
    dispatch(bringDisplayToFront({ id }))
  }

  // Combined drag and resize functionality
  useEffect(() => {
    if (!display || !displayRef.current) return
    const headerNode = headerRef.current

    // Drag functionality
    const handleDragStart = (e: MouseEvent) => {
      if (!display) return

      e.preventDefault()

      // Bring display to front when starting to drag
      dispatch(bringDisplayToFront({ id: display.id }))

      // If maximized, restore to normal when starting to drag
      if (display.isMaximized) {
        dispatch(restoreDisplay({ id: display.id }))

        // Need to delay setting up drag to allow state update
        setTimeout(() => {
          setDragging(true)
          dragPointerStartRef.current = { x: e.clientX, y: e.clientY }
          dragPositionStartRef.current = {
            x: display.prevState?.position.x ?? 0,
            y: display.prevState?.position.y ?? 0
          }
        }, 50)
        return
      }

      setDragging(true)
      dragPointerStartRef.current = { x: e.clientX, y: e.clientY }
      dragPositionStartRef.current = {
        x: display.position?.x ?? 0,
        y: display.position?.y ?? 0
      }
    }

    const handleDrag = (e: MouseEvent) => {
      if (!dragging || !display || !displayRef.current) return

      e.preventDefault()

      const dx = e.clientX - dragPointerStartRef.current.x
      const dy = e.clientY - dragPointerStartRef.current.y

      const newLeft = dragPositionStartRef.current.x + dx
      const newTop = dragPositionStartRef.current.y + dy

      // Update position in Redux directly
      dispatch(
        updateDisplayPosition({
          id: display.id,
          position: { x: newLeft, y: newTop }
        })
      )

      // We keep start refs constant during a drag; deltas are based on initial down
    }

    const handleDragEnd = () => {
      setDragging(false)
    }

    // Resize functionality
    const handleResizeMove = (e: MouseEvent) => {
      if (!resizing || !display) return

      const dx = e.clientX - resizePointerStartRef.current.x
      const dy = e.clientY - resizePointerStartRef.current.y

      // Only resize from bottom-right corner
      const newWidth = Math.max(resizeSizeStartRef.current.width + dx, 400) // Minimum width
      const newHeight = Math.max(resizeSizeStartRef.current.height + dy, 400) // Minimum height

      // Update size in Redux directly
      dispatch(
        updateDisplaySize({
          id: display.id,
          size: { width: newWidth, height: newHeight }
        })
      )
    }

    const handleResizeEnd = () => {
      setResizing(false)
      document.body.style.cursor = "default"
    }

    // Add event listeners
    if (headerNode) {
      headerNode.addEventListener("mousedown", handleDragStart)
    }

    if (dragging) {
      document.addEventListener("mousemove", handleDrag)
      document.addEventListener("mouseup", handleDragEnd)
    }

    if (resizing) {
      document.addEventListener("mousemove", handleResizeMove)
      document.addEventListener("mouseup", handleResizeEnd)
      document.body.style.cursor = "nwse-resize"
    }

    // Cleanup
    return () => {
      if (headerNode) {
        headerNode.removeEventListener("mousedown", handleDragStart)
      }
      document.removeEventListener("mousemove", handleDrag)
      document.removeEventListener("mouseup", handleDragEnd)
      document.removeEventListener("mousemove", handleResizeMove)
      document.removeEventListener("mouseup", handleResizeEnd)
    }
  }, [dragging, resizing, dispatch, display])

  const startResize = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!display) return

    dispatch(bringDisplayToFront({ id: display.id }))
    setResizing(true)
    resizePointerStartRef.current = { x: e.clientX, y: e.clientY }
    resizeSizeStartRef.current = {
      width: display.size.width,
      height: display.size.height
    }
    document.body.style.cursor = "nwse-resize"
  }

  // If display is not found in state, don't render
  if (!display) return null

  return (
    <article
      ref={displayRef}
      // className="flex flex-col border border-[rgb(var(--folder-border-color))] bg-[rgb(var(--folder-background-color))] text-xs font-normal text-white"
      className="flex flex-col border border-[rgb(var(--folder-border-color))] bg-[rgb(var(--folder-background-color))] text-xs font-normal text-white"
      style={{
        position: "absolute",
        width: `${display.size.width}px`,
        height: `${display.size.height}px`,
        left: `${display.position.x}px`,
        top: `${display.position.y}px`,
        zIndex: display.zIndex
      }}
      onClick={handleDisplayClick}
    >
      {/* Resize handle - only at bottom right corner */}

      <div
        className={twMerge(
          "flex min-h-[1.875rem] w-full flex-row justify-between",
          !displayData.isFocused && "bg-[rgb(43,43,43)] text-[rgb(128,128,128)]"
        )}
      >
        <div
          ref={headerRef}
          id={`my-div-header-${uniqueId}`}
          className="flex w-full cursor-move flex-row items-center justify-start"
        >
          <DisplayFolderHeader displayData={displayData} />
        </div>
        <DisplayActions id={id} display={display} displayData={displayData} />
      </div>
      <DisplayTaskbar />

      <div className="flex h-full flex-1 flex-col bg-[rgb(25,25,25)]">
        <DisplayNavigation displayData={displayData} />
        <div className="grid flex-1 grid-cols-[195px_1fr] overflow-hidden">
          <DisplaySideMenu />
          {displayData.children.length > 0 && (
            <DisplayChildrenItem displayData={displayData} />
          )}
          {displayData.children.length === 0 && (
            <div className="flex flex-1 items-start justify-center gap-0.5 bg-[rgb(32,32,32)] pl-[1.0625rem] pt-1.5">
              <span className="mt-2 text-[12px]">This folder is empty.</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex min-h-[23px] w-full bg-[rgb(51,51,51)] items-center justify-between pl-3">
        <span className="text-xs font-normal">
          {`${displayData.children.length} ${displayData.children.length === 1 ? "item" : "items"}`}
        </span>
        <div
          className="z-10 flex h-4 w-4 cursor-nwse-resize items-center justify-center"
          onMouseDown={startResize}
        >
          <img
            src={RESIZE_ICON_ICON}
            alt="resize icon"
            className="h-3 w-3 object-contain"
          />
        </div>
      </div>

      {/* {displayData.type === GlobalDataType.FILE && (
        <div className="flex h-full flex-1 flex-col bg-[rgb(25,25,25)]">
          <iframe
            src={displayData.url}
            className="h-full w-full"
            title="Resume"
          />
        </div>
      )} */}
    </article>
  )
}
