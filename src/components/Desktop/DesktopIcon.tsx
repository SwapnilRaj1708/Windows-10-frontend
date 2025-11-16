import type { KeyboardEvent as ReactKeyboardEvent } from "react"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { twMerge } from "tailwind-merge"
import type { AppDispatch, IRootState } from "@/app/store"
import { openItemThunk } from "@/context/redux/globalDataSlice"

export default function DesktopIcon({ id }: { id: string }) {
  const { name, icon, isOpened } = useSelector(
    (state: IRootState) => state.globalData[id]
  )
  const [isSelected, setIsSelected] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const dispatch = useDispatch<AppDispatch>()

  // Focus when selected so keyboard works without extra click
  useEffect(() => {
    if (isSelected) {
      buttonRef.current?.focus()
    }
  }, [isSelected])

  useEffect(() => {
    const handleDocumentMouseDown = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        if (isSelected) {
          setIsSelected(false)
        }
      }
    }

    document.addEventListener("click", handleDocumentMouseDown)
    return () => {
      document.removeEventListener("click", handleDocumentMouseDown)
    }
  }, [isSelected])

  const handleMouseDown = () => {
    setIsSelected(true)
  }

  const openThisFolder = () => {
    dispatch(openItemThunk({ id }))
  }

  const handleDoubleClick = () => {
    if (!isOpened) {
      openThisFolder()
    }
  }

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" && isSelected && !isOpened) {
      e.preventDefault()
      openThisFolder()
    }
  }

  return (
    <button
      id={`desktop-icon-${id}`}
      data-id={id}
      ref={buttonRef}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      type="button"
      className={twMerge(
        "desktop-icon flex w-[var(--desktop-icon-width)] cursor-default flex-col items-center justify-center gap-0.5 p-[0.1875rem] outline-1 outline-offset-[-2px] outline-[rgb(var(--desktop-icon-hover-outline-color))] hover:bg-[rgb(var(--desktop-icon-hover-background-color))] hover:outline",
        isSelected &&
          "bg-[rgb(var(--desktop-icon-selected-background-color))] outline outline-[rgb(var(--desktop-icon-selected-outline-color))] hover:bg-[rgb(var(--desktop-icon-selected-hover-background-color))] hover:outline-[rgb(var(--desktop-icon-selected-hover-outline-color))]"
      )}
    >
      <div className="max-h-[var(--desktop-icon-inner-image-height)] w-full max-w-[var(--desktop-icon-inner-image-width)] pb-[3px] pr-[3px]">
        <img
          className="h-full w-full drop-shadow-[1.5px_1.5px_1.5px_rgba(0,0,0,0.3)]"
          src={icon}
          alt="File Explorer"
        />
      </div>
      <p className="line-clamp-2 w-full overflow-hidden text-ellipsis whitespace-pre-wrap break-words px-[0.125rem] text-center text-xs font-normal leading-[15px] tracking-tight text-white drop-shadow-[1.25px_1px_0.75px_rgba(0,0,0,.9)]">
        {name}
      </p>
    </button>
  )
}
