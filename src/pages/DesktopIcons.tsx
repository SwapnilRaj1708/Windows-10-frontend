import file_explorer_icon from "../assets/icons/file_explorer_icon.png";
import DesktopIcon from "./DesktopIcon";

export default function DesktopIcons() {
  const desktopIcons = [
    {
      _id: "1",
      name: "File Explorer",
      icon: file_explorer_icon,
    },
    {
      _id: "2",
      name: "lllllllllllllllllllllllllllllllllllllllllllll",
      icon: file_explorer_icon,
    },
    {
      _id: "3",
      name: "l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l ",
      icon: file_explorer_icon,
    },
    {
      _id: "1",
      name: "File Explorer",
      icon: file_explorer_icon,
    },
    {
      _id: "2",
      name: "lllllllllllllllllllllllllllllllllllllllllllll",
      icon: file_explorer_icon,
    },
    {
      _id: "3",
      name: "l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l l ",
      icon: file_explorer_icon,
    },
  ];

  return (
    <div className="absolute flex h-full max-h-screen w-full flex-col flex-wrap content-start items-start justify-start gap-y-4 px-[0.0625rem] py-[0.3125rem] pb-[var(--taskbar-height)]">
      {desktopIcons.map((icon) => (
        <DesktopIcon key={icon._id} {...icon} />
      ))}
    </div>
  );
}
