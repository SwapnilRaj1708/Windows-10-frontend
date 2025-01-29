"use client";
import useDesktop from "@/hooks/use-desktop";
import { DesktopIconProps } from "@/types";
import "./DesktopIcon.css";
import { useState, useContext } from "react";

const desktopIconClass =
  "hover:bg-[rgb(var(--desktop-icon-background-color-hover),var(--desktop-icon-background-color-hover-alpha))] hover:outline";

const desktopIconClass_selected =
  "bg-[rgb(var(--desktop-icon-background-color-select),var(--desktop-icon-background-color-select-alpha))] outline hover:bg-[rgb(var(--desktop-icon-background-color-select-hover),var(--desktop-icon-background-color-select-hover-alpha))]";

export default function DesktopIcon({ _id, icon, name }: DesktopIconProps) {
  const { selectedIcon, setSelectedIcon } = useDesktop();
  const handleClick = () => {
    setSelectedIcon({ _id, icon, name });
  };

  return (
    <button
      // onClick={() => handleClick()}
      className={`flex w-[var(--desktop-icon-width)] cursor-default flex-col items-center justify-center outline-offset-[-1px] outline-[rgb(var(--desktop-icon-border-color),var(--desktop-icon-border-color-alpha))] ${
        // selectedIcon?._id === _id ?
        desktopIconClass_selected
        // : desktopIconClass
      }`}
    >
      <div className="mb-[.13rem] max-h-[var(--desktop-icon-inner-image-height)] w-full max-w-[var(--desktop-icon-inner-image-width)]">
        <Image className="h-full w-full" src={icon} alt="File Explorer" />
      </div>
      <p className="line-clamp-2 w-full overflow-hidden text-ellipsis whitespace-pre-wrap break-words px-[2px] text-center text-[.825rem] not-italic leading-[normal] tracking-[-0.02344rem] text-white drop-shadow-[1.25px_1px_0.75px_rgba(0,0,0,.9)]">
        {name}
      </p>
    </button>
  );
}
