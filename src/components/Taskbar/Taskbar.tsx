import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import WindowsStartButton from "./WindowsStartButton";
import { motion } from "motion/react";
import { IRootState } from "@/app/store";
import { twMerge } from "tailwind-merge";
import WindowsStartMenu from "./WindowsStartMenu";
import NotificationIcon from "./NotificationIcon";
import { setOpen } from "@/context/redux/globalDataSlice";
import { openFolder } from "@/context/redux/folderSlice";

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

const TaskbarInput = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  return (
    <input
      type="text"
      className="placeholder:text-[rgb(var(--light-theme),.75) box-border w-72 border border-[rgb(var(--taskbar-icon-outline-color))] bg-[rgb(var(--taskbar-search-bar-background-color))] px-4 outline-offset-4 hover:border-[.1875rem] hover:border-[rgb(var(--taskbar-search-bar-outline-color-hover))] hover:bg-[rgb(var(--taskbar-search-bar-background-color-hover))] hover:px-[.9rem] focus-visible:border-[.1875rem] focus-visible:border-[rgb(var(--accent-color))] focus-visible:bg-[rgb(var(--light-theme))] focus-visible:px-[.9rem] focus-visible:outline-none"
      placeholder="Type here to search"
      name="searchInput"
      value={searchInput}
      onChange={(e) => setSearchInput(e.target.value)}
      onBlur={() => setSearchInput("")}
    />
  );
};

const TaskbarIcon = ({
  id,
  icon,
  name,
  isFocused,
  isOpened,
}: {
  id: string;
  icon: string;
  name: string;
  isFocused: boolean;
  isOpened: boolean;
}) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    if (!isOpened) {
      dispatch(setOpen({ id }));
      dispatch(openFolder({ id }));
    }
  };

  return (
    <button
      className={twMerge(
        "group relative flex h-full w-12 cursor-default items-center justify-center duration-75 hover:bg-[rgb(var(--taskbar-icon-background-color-hover))] active:bg-[rgb(var(--taskbar-icon-background-color-active))]",
        isFocused &&
          "bg-[rgb(var(--taskbar-active-app-background-color))] hover:bg-[rgb(var(--taskbar-active-app-background-color-hover))] active:bg-[rgb(var(--taskbar-active-app-background-color-active))]",
      )}
      onClick={handleClick}
    >
      <img src={icon} alt={name} className="aspect-square w-6 object-contain" />
      {isOpened && (
        <div
          className={twMerge(
            "absolute bottom-0 h-[0.125rem] w-10/12 bg-[rgb(var(--taskbar-active-app-stroke-color))] duration-75 ease-in-out group-hover:w-full",
            isFocused && "w-full",
          )}
        ></div>
      )}
    </button>
  );
};

export default function Taskbar() {
  const [time, setTime] = useState<string>(getTime());
  const [date, setDate] = useState<string>(getDate());
  // const dispatch = useDispatch();
  const isWindowsStartMenuOpen = useSelector(
    (state: IRootState) => state.windowsStartMenu.isWindowsStartMenuOpen,
  );
  const taskbarIcons = useSelector((state: IRootState) =>
    state.globalData.data.map((item) => ({
      id: item.id,
      name: item.name,
      icon: item.icon,
      isOpened: item.isOpened,
      isFocused: item.isFocused,
    })),
  );

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
    <>
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -40, opacity: 0 }}
        transition={{ duration: 0.2 }}
        key={`windows-start-menu-${isWindowsStartMenuOpen}`}
        style={{
          boxShadow: "0 0 0.625rem 0 rgba(0, 0, 0, 0.5)",
          zIndex: 10,
          position: "absolute",
          bottom: "var(--taskbar-height)",
          left: 0,
          height: "40rem",
          width: "40.5rem",
          background: "rgb(var(--windows-start-menu-background-color))",
          display: isWindowsStartMenuOpen ? "flex" : "none",
        }}
      >
        <WindowsStartMenu />
      </motion.div>
      <footer className="taskbar backdrop-[var(--taskbar-backdrop-filter)] fixed bottom-0 z-10 flex h-[var(--taskbar-height)] w-full justify-between bg-[rgb(var(--taskbar-background-color),var(--taskbar-background-color-alpha))] backdrop-blur-[var(--taskbar-backdrop-filter-blur)]">
        <div className="flex h-full flex-row">
          <WindowsStartButton />
          <TaskbarInput />
          <div className="flex h-full flex-row gap-[0.0625rem]">
            {taskbarIcons.map((icon) => (
              <TaskbarIcon key={icon.id} {...icon} />
            ))}
          </div>
        </div>
        <div className="flex h-full flex-row items-end">
          <button className="flex h-full w-[4.375rem] cursor-default flex-col items-center justify-center gap-[.15rem] text-xs font-normal text-white duration-75 hover:bg-[rgb(var(--taskbar-icon-background-color-hover))] active:bg-[rgb(var(--taskbar-icon-background-color-active))]">
            <span className="text-xs">{time}</span>
            <span className="text-xs">{date}</span>
          </button>
          <button className="flex h-full w-[2.5rem] cursor-default items-center justify-center duration-75 hover:bg-[rgb(var(--taskbar-icon-background-color-hover))] active:bg-[rgb(var(--taskbar-icon-background-color-active))]">
            <NotificationIcon />
          </button>
          <div className="ml-2 h-full w-[.3rem] cursor-default border-0 border-l border-[rgb(var(--taskbar-icon-outline-color))] hover:bg-[rgb(var(--taskbar-icon-background-color-hover))] active:bg-[rgb(var(--taskbar-icon-background-color-active))]"></div>
        </div>
      </footer>
    </>
  );
}
