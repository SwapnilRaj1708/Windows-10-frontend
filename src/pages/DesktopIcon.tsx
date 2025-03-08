"use client";
import { useState, useContext } from "react";
import { twMerge } from "tailwind-merge";

export default function DesktopIcon({ _id, icon, name }: DesktopIconProps) {
  const [isSelected, setIsSelected] = useState(false);
  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <button
      onClick={() => handleClick()}
      className={twMerge(
        "flex w-[var(--desktop-icon-width)] cursor-default flex-col items-center justify-center gap-0.5 p-[0.1875rem] outline-1 outline-offset-[-2px] outline-[rgb(var(--desktop-icon-hover-outline-color))] hover:bg-[rgb(var(--desktop-icon-hover-background-color))] hover:outline",
        isSelected &&
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
