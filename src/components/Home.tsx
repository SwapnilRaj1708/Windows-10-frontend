import { useSelector } from "react-redux";
import main_screen_background from "./main_screen_background.jpg";
import Taskbar from "./Taskbar/Taskbar";
import { IRootState } from "@/app/store";
import ContextMenu from "./ContextMenu/ContextMenu";
// import DesktopIcons from "./DesktopIcons";
import file_explorer_icon from "../assets/icons/file_explorer_icon.png";
import DesktopIcons from "@/pages/DesktopIcons";

export default function Home() {
  const { isLocked } = useSelector((state: IRootState) => state.lockScreen);

  const contextMenuItems = [
    {
      label: "View",
      children: [
        {
          label: "View",
          onClick: () => console.log("View Clicked"),
          icon: file_explorer_icon,
        },
      ],
    },
    {
      label: "Sort by",
      children: [
        {
          label: "View",
          onClick: () => console.log("View Clicked"),
          icon: file_explorer_icon,
        },
      ],
    },
    {
      label: "Refresh",
      children: [
        {
          label: "View",
          onClick: () => console.log("View Clicked"),
          icon: file_explorer_icon,
        },
      ],
    },
    { divider: true },
    {
      label: "Paste",
      // onClick: () => console.log("Paste clicked"),
    },
    { divider: true },
    {
      label: "New",
      children: [
        {
          label: "View",
          onClick: () => console.log("View Clicked"),
          icon: file_explorer_icon,
        },
      ],
    },
    { divider: true },
    {
      label: "Display settings",
      // onClick: () => console.log("Display settings clicked"),
      icon: file_explorer_icon,
    },
    {
      label: "Personalize",
      // onClick: () => console.log("Personalize clicked"),
      icon: file_explorer_icon,
    },
  ];

  return !isLocked ? (
    <main
      className="relative h-screen max-h-screen w-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${main_screen_background})`,
      }}
    >
      {/* <ContextMenu items={contextMenuItems} /> */}
      <Taskbar />
      <DesktopIcons />
    </main>
  ) : (
    <main className="relative h-screen max-h-screen w-screen bg-black"></main>
  );
}
