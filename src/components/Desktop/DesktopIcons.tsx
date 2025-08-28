import DesktopIcon from "./DesktopIcon";
import { useSelector } from "react-redux";
import { IRootState } from "@/app/store";

export default function DesktopIcons() {
  const desktopIcons = useSelector((state: IRootState) =>
    state.globalData.data.map((item) => ({
      id: item.id,
      name: item.name,
      icon: item.icon,
      isOpened: item.isOpened,
      isDesktopIconSelected: item.isDesktopIconSelected,
    })),
  );

  return (
    <div className="absolute flex h-full max-h-screen w-full flex-col flex-wrap content-start items-start justify-start gap-y-4 px-[0.0625rem] py-[0.3125rem] pb-[var(--taskbar-height)]">
      {desktopIcons.map((icon) => (
        <DesktopIcon key={icon.id} {...icon} />
      ))}
    </div>
  );
}
