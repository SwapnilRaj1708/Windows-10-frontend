import { useEffect, useState } from "react"
import { LiaBatteryHalfSolid } from "react-icons/lia"
import { useDispatch, useSelector } from "react-redux"
import { twMerge } from "tailwind-merge"
import { IRootState } from "@/app/store"
import { LOCK_SCREEN_1 } from "@/assets/assets"
import InternetIcon from "@/assets/lockScreen/InternetIcon"
import LikeWhatYouSeeCameraIcon from "@/assets/lockScreen/LikeWhatYouSeeCameraIcon"
import { setInitialLoad, setIsLocked } from "@/context/redux/lockScreenSlice"
import DateAndTime from "./DateAndTime"
import LockScreenPasswordScreen from "./LockScreenPasswordScreen"

const LockScreen = () => {
  const dispatch = useDispatch()
  const { isLocked, initialLoad } = useSelector(
    (state: IRootState) => state.lockScreen
  )
  const [isVisible, setIsVisible] = useState(false)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    if (!isLocked && !initialLoad) return
    setIsClicked(false)
    if (initialLoad) {
      setIsVisible(true)
      dispatch(setInitialLoad(false))
      return
    }

    const img = new Image()
    img.src = LOCK_SCREEN_1
    img.onload = () => {
      setTimeout(() => {
        setIsVisible(true)
      }, 75)
    }
  }, [isLocked, initialLoad, dispatch])

  const handleUnlock = () => {
    setIsVisible(false)
    setTimeout(() => {
      dispatch(setIsLocked(false))
    }, 500)
  }

  if (!isLocked && !initialLoad) return null

  const handleClick = () => {
    setIsClicked(true)
  }

  return (
    <main
      className={twMerge(
        "absolute left-0 top-0 z-10 h-full w-full overflow-hidden bg-black bg-cover bg-center text-white transition-all duration-500",
        initialLoad ? "opacity-100" : isVisible ? "opacity-100" : "opacity-0"
      )}
      style={{
        backgroundImage: `url(${LOCK_SCREEN_1})`
      }}
    >
      {!isClicked && (
        <div
          onClick={handleClick}
          className="relative h-full w-full p-[1.6875rem]"
        >
          <div className="absolute right-[1.6875rem] top-[1.6875rem] inline-flex w-full max-w-[21.9375rem] items-center justify-start gap-4 overflow-hidden p-[0.3125rem]">
            <div className="inline-flex aspect-square w-8 flex-col items-center justify-center gap-2.5 overflow-hidden rounded-[5.125rem] bg-black bg-opacity-20 px-[0.4375rem] py-[0.5625rem]">
              <LikeWhatYouSeeCameraIcon />
            </div>
            <p className="text-[0.9375rem] font-normal">Like what you see?</p>
          </div>
          <DateAndTime />
          <div className="absolute bottom-[1.6875rem] right-[1.6875rem] flex items-center gap-8">
            <InternetIcon />
            <LiaBatteryHalfSolid size={32} />
          </div>
        </div>
      )}

      <LockScreenPasswordScreen
        isClicked={isClicked}
        handleUnlock={handleUnlock}
      />
    </main>
  )
}

export default LockScreen
