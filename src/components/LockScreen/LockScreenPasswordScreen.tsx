import { useState } from "react"
import { BsPower } from "react-icons/bs"
import { GoPerson } from "react-icons/go"
import { twMerge } from "tailwind-merge"
import AccessibilityIcon from "@/assets/lockScreen/AccessibilityIcon"
import WifiIcon from "@/assets/lockScreen/WifiIcon"

const LockScreenPasswordScreen = ({
  isClicked,
  handleUnlock
}: {
  isClicked: boolean
  handleUnlock: () => void
}) => {
  const [password, setPassword] = useState("")
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
    if (e.target.value.length >= 4) {
      handleUnlock()
    }
  }
  return (
    <div
      className={twMerge(
        "relative h-full w-full",
        isClicked ? "opacity-100" : "opacity-0"
      )}
    >
      <div
        className={twMerge(
          "relative z-10 flex h-full w-full items-center justify-center backdrop-blur-none transition duration-1000",
          isClicked ? "backdrop-blur-md" : "backdrop-blur-0"
        )}
      >
        <div className="absolute left-1/2 top-[calc(50%-2.5rem)] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center">
          <div className="mb-[.45rem] flex h-[190px] w-[190px] items-center justify-center overflow-hidden rounded-full bg-slate-100 shadow-md">
            <GoPerson size={110} color="black" />
          </div>
          <p className="mb-[1.5rem] text-[46px] font-extralight text-white">
            Swapnil Raj
          </p>
          {isClicked && (
            <input
              type="password"
              className="placeholder:text-[rgb(var(--light-theme),.75) mb-2.5 box-border h-[46px] w-[294px] border border-[rgb(var(--taskbar-icon-outline-color))] bg-[rgb(var(--taskbar-search-bar-background-color))] px-4 text-black outline-offset-4 hover:border-[.1875rem] hover:border-[rgb(var(--taskbar-search-bar-outline-color-hover))] hover:bg-[rgb(var(--taskbar-search-bar-background-color-hover))] hover:px-[.9rem] focus-visible:border-[.1875rem] focus-visible:border-[rgb(var(--accent-color))] focus-visible:bg-[rgb(var(--light-theme))] focus-visible:px-[.9rem] focus-visible:outline-none"
              placeholder="Type here to search"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              onBlur={() => setPassword("")}
              autoComplete="current-password"
              autoFocus
            />
          )}
          <p className="font-extralight text-white">I forgot my PIN</p>
        </div>
        <div className="absolute bottom-[1.6875rem] right-[1.6875rem] flex items-center gap-[0.625rem]">
          <WifiIcon />
          <AccessibilityIcon />
          <BsPower size={36} />
        </div>
      </div>
    </div>
  )
}

export default LockScreenPasswordScreen
