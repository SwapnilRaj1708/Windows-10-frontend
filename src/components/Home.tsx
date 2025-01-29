import { useSelector } from "react-redux";
import main_screen_background from "./main_screen_background.jpg";
import Taskbar from "./Taskbar";
import { IRootState } from "@/app/store";
// import DesktopIcons from "./DesktopIcons";

export default function Home() {
  const { isLocked } = useSelector((state: IRootState) => state.lockScreen);
  return !isLocked ? (
    <main
      style={{
        backgroundImage: `url(${main_screen_background})`,
      }}
      className="relative h-screen max-h-screen w-screen bg-cover bg-center bg-no-repeat"
    >
      <Taskbar />
      {/* <DesktopIcons /> */}
    </main>
  ) : (
    <main className="relative h-screen max-h-screen w-screen bg-black"></main>
  );
}
