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
  ];

  return (
    <div className="absolute grid h-full w-full auto-cols-auto grid-flow-row auto-rows-max content-start items-start justify-start gap-x-[.25rem] gap-y-4 px-1 py-2">
      {desktopIcons.map((icon) => (
        <DesktopIcon key={icon._id} {...icon} />
      ))}
    </div>
  );
}
