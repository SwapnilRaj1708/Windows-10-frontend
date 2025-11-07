import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, IRootState } from "@/app/store"
import {
  IGlobalDataFolder,
  openItemThunk
} from "@/context/redux/globalDataSlice"

const DisplayChildrenItem = ({
  displayData
}: {
  displayData: IGlobalDataFolder
}) => {
  const dispatch = useDispatch<AppDispatch>()
  const globalData = useSelector((state: IRootState) => state.globalData)

  const handleChildrenClick = (id: string) => {
    dispatch(openItemThunk({ id }))
  }

  return (
    <div className="grid flex-1 grid-cols-[repeat(auto-fill,minmax(105px,1fr))] flex-wrap content-start justify-between gap-0.5 bg-[rgb(32,32,32)] pl-[1.0625rem] pt-1.5 overflow-y-auto">
      {/* TODO: add selected bg effect here later */}
      {displayData.children.map((item, index) => (
        <div
          onDoubleClick={() => handleChildrenClick(globalData[item].id)}
          key={index}
          // border border-[rgb(60,60,60)]
          className="flex h-fit max-h-[161px] w-[105px] flex-col items-center justify-start px-[0.3125rem] pb-0.5 pt-[0.1875rem] hover:bg-[rgb(77,77,77)] active:bg-[rgb(98,98,98)]"
        >
          <div className="flex aspect-square w-full flex-col items-center justify-start pb-[0.1875rem] pr-[0.1875rem]">
            <img
              src={globalData[item].icon}
              alt="file explorer icon"
              className="h-full w-full max-h-[5.625rem] max-w-[5.625rem] object-contain drop-shadow-[1.5px_1.5px_1.5px_rgba(0,0,0,0.3)]"
            />
          </div>
          <p className="line-clamp-4 overflow-hidden text-ellipsis text-center text-xs font-normal">
            {globalData[item].name}
          </p>
        </div>
      ))}
    </div>
  )
}

export default DisplayChildrenItem
