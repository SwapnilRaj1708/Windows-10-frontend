import { createPortal } from "react-dom"
import { useSelector } from "react-redux"
import type { IRootState } from "@/app/store"
import Display from "./Display"

const DisplayContainer = () => {
  const openDisplays = useSelector(
    (state: IRootState) => state.display.openItems
  )

  return (
    <>
      {openDisplays.map(display =>
        createPortal(
          <Display key={display.id} id={display.id} />,
          document.body
        )
      )}
    </>
  )
}

export default DisplayContainer
