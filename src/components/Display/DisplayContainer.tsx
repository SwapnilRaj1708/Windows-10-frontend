import { createPortal } from "react-dom"
import { useSelector } from "react-redux"
import type { IRootState } from "@/app/store"
import { GlobalDataType } from "../../context/redux/globalDataSlice"
import FileDisplay from "./FileDisplay"
import FolderDisplay from "./FolderDisplay"

const DisplayContainer = () => {
  const openDisplays = useSelector(
    (state: IRootState) => state.display.openItems
  )
  const globalData = useSelector((state: IRootState) => state.globalData)
  return (
    <>
      {openDisplays.map(display => {
        if (globalData[display.id].type === GlobalDataType.FOLDER)
          return createPortal(
            <FolderDisplay key={display.id} id={display.id} />,
            document.body
          )
        if (globalData[display.id].type === GlobalDataType.FILE)
          return createPortal(
            <FileDisplay key={display.id} id={display.id} />,
            document.body
          )
      })}
    </>
  )
}

export default DisplayContainer
