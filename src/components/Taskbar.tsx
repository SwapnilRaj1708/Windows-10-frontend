import { useState, useEffect } from "react";
import { AiFillWindows } from "react-icons/ai";
import { IoLogoWindows } from "react-icons/io";
import file_explorer_icon from "../assets/icons/file_explorer_icon.png";
import notification_icon from "../assets/icons/notification_icon.png";
import notification_svg from "../assets/icons/notification_svg.svg";
import { useDispatch } from "react-redux";
import { setIsLocked } from "@/context/redux/lockScreenSlice";

//function to display the current time as 21:30 format (24 hour format) with both hours and minutes padded with 0 if they are single digit
const getTime = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
};

//function to display the current date as 21-07-2023 format with both day, month and year padded with 0 if they are single digit
const getDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day < 10 ? "0" + day : day}-${
    month < 10 ? "0" + month : month
  }-${year}`;
};

export default function Taskbar() {
  const [searchInput, setSearchInput] = useState<string>("");
  const [time, setTime] = useState<string>(getTime());
  const [date, setDate] = useState<string>(getDate());
  const dispatch = useDispatch();

  //set the time and date to the current time and date using the getTime and getDate functions using the setInterval function to update the time and date every second in useEffect

  useEffect(() => {
    const timeAndDate = setInterval(() => {
      setTime(getTime());
      setDate(getDate());
    }, 1000);

    return () => {
      clearInterval(timeAndDate);
    };
  }, []);

  return (
    <footer className="taskbar backdrop-[var(--taskbar-backdrop-filter)] absolute bottom-0 flex h-[var(--taskbar-height)] w-full justify-between bg-[rgb(var(--taskbar-background-color),var(--taskbar-background-color-alpha))] backdrop-blur-[var(--taskbar-backdrop-filter-blur)]">
      <div className="flex h-full flex-row">
        <button className="group flex h-full w-12 cursor-default items-center justify-center duration-75 hover:bg-[rgb(var(--taskbar-icon-background-color-hover))]">
          <IoLogoWindows className="start-icon icon-image h-[1.25rem] w-[1.25rem] text-[rgb(var(--taskbar-icon-color))] group-hover:text-[rgb(var(--accent-color))]" />
        </button>
        <input
          type="text"
          className="placeholder:text-[rgb(var(--light-theme),.75) box-border w-72 border border-[rgb(var(--taskbar-icon-outline-color))] bg-[rgb(var(--taskbar-search-bar-background-color))] px-4 outline-offset-4 hover:border-[.1875rem] hover:border-[rgb(var(--taskbar-search-bar-outline-color-hover))] hover:bg-[rgb(var(--taskbar-search-bar-background-color-hover))] hover:px-[.9rem] focus-visible:border-[.1875rem] focus-visible:border-[rgb(var(--accent-color))] focus-visible:bg-[rgb(var(--light-theme))] focus-visible:px-[.9rem] focus-visible:outline-none"
          placeholder="Type here to search"
          name="searchInput"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onBlur={() => setSearchInput("")}
        />
        <button className="group relative flex h-full w-[3.25rem] cursor-default items-center justify-center duration-75 hover:bg-[rgb(var(--taskbar-icon-background-color-hover))]">
          <img
            src={file_explorer_icon}
            alt="File Explorer icon"
            objectFit="cover"
            quality={100}
            priority={true}
            className="m-3.5"
          />
          <div className="absolute bottom-0 h-[.175rem] w-10/12 bg-[rgb(var(--accent-color))] duration-75 group-hover:w-full"></div>
        </button>
        <button
          onClick={() => dispatch(setIsLocked(true))}
          className="flex h-full w-[3.25rem] cursor-default items-center justify-center duration-75 hover:bg-[rgb(var(--taskbar-icon-background-color-hover))]"
        >
          <img
            src={file_explorer_icon}
            alt="File Explorer icon"
            objectFit="cover"
            quality={100}
            priority={true}
            className="m-3.5"
          />
        </button>
        <button className="flex h-full w-[3.25rem] cursor-default items-center justify-center duration-75 hover:bg-[rgb(var(--taskbar-icon-background-color-hover))]">
          <img
            src={file_explorer_icon}
            alt="File Explorer icon"
            objectFit="cover"
            quality={100}
            priority={true}
            className="m-3.5"
          />
        </button>
      </div>
      <div className="flex h-full flex-row items-end">
        <button className="flex h-full w-[4.65rem] cursor-default flex-col items-center justify-center gap-[.15rem] font-extralight text-white duration-75 hover:bg-[rgb(var(--taskbar-icon-background-color-hover))]">
          <span className="text-xs">{time}</span>
          <span className="text-xs">{date}</span>
        </button>
        <button className="flex h-full w-[2.5rem] cursor-default items-center justify-center duration-75 hover:bg-[rgb(var(--taskbar-icon-background-color-hover))]">
          <img
            src={notification_svg}
            alt="File Explorer icon"
            objectFit="cover"
            quality={100}
            priority={true}
            className="m-[.70rem]"
          />
        </button>
        <button className="ml-[.5rem] h-full w-[.3rem] cursor-default border-0 border-l border-[rgb(var(--taskbar-icon-outline-color))] hover:bg-[rgb(var(--taskbar-icon-background-color-hover))]"></button>
      </div>
    </footer>
  );
}
