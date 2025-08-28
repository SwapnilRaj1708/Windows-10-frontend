import { useDispatch } from "react-redux";
import { twMerge } from "tailwind-merge";
import { useRef, useEffect } from "react";
import type { KeyboardEvent as ReactKeyboardEvent } from "react";
import {
  IGlobalData,
  setDesktopIconSelected,
  setDesktopIconUnselected,
  setOpen,
} from "@/context/redux/globalDataSlice";
import { openFolder } from "@/context/redux/folderSlice";

export default function DesktopIcon({
  id,
  icon,
  name,
  isOpened,
  isDesktopIconSelected,
}: Pick<
  IGlobalData,
  "id" | "name" | "icon" | "isOpened" | "isDesktopIconSelected"
>) {
  const dispatch = useDispatch();
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Focus when selected so keyboard works without extra click
  useEffect(() => {
    if (isDesktopIconSelected) {
      buttonRef.current?.focus();
    }
  }, [isDesktopIconSelected]);

  useEffect(() => {
    const handleDocumentMouseDown = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        if (isDesktopIconSelected) {
          dispatch(setDesktopIconUnselected({ id }));
        }
      }
    };

    document.addEventListener("click", handleDocumentMouseDown);
    return () => {
      document.removeEventListener("click", handleDocumentMouseDown);
    };
  }, [dispatch, id, isDesktopIconSelected]);

  const handleMouseDown = () => {
    dispatch(setDesktopIconSelected({ id }));
  };

  const openThisFolder = () => {
    dispatch(setOpen({ id }));
    dispatch(openFolder({ id }));
  };

  const handleDoubleClick = () => {
    if (!isOpened) {
      openThisFolder();
    }
  };

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "Enter" && isDesktopIconSelected && !isOpened) {
      e.preventDefault();
      openThisFolder();
    }
  };

  return (
    <button
      ref={buttonRef}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      onKeyDown={handleKeyDown}
      type="button"
      className={twMerge(
        "flex w-[var(--desktop-icon-width)] cursor-default flex-col items-center justify-center gap-0.5 p-[0.1875rem] outline-1 outline-offset-[-2px] outline-[rgb(var(--desktop-icon-hover-outline-color))] hover:bg-[rgb(var(--desktop-icon-hover-background-color))] hover:outline",
        isDesktopIconSelected &&
          "bg-[rgb(var(--desktop-icon-selected-background-color))] outline outline-[rgb(var(--desktop-icon-selected-outline-color))] hover:bg-[rgb(var(--desktop-icon-selected-hover-background-color))] hover:outline-[rgb(var(--desktop-icon-selected-hover-outline-color))]",
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
  );
}
