import { IGlobalDataFile } from "@/context/redux/globalDataSlice"

const DisplayFileHeader = ({
  displayData
}: {
  displayData: IGlobalDataFile
}) => {
  return (
    <div className="flex h-full flex-row items-center justify-center">
      <div className="mr-1 flex h-[1.375rem] w-[1.375rem] items-center justify-center">
        <img
          src={displayData.icon}
          alt="file explorer icon"
          className="h-4 w-4 object-contain"
        />
      </div>
      {/* <div className="mr-1 h-[0.8125rem] w-[0.1875rem] border border-[rgb(113,113,113)] bg-[rgb(72,72,72)]" />
      <div className="flex flex-row items-center justify-center">
        <div className="flex h-[1.375rem] w-[1.375rem] items-center justify-center">
          <img
            src={PROPERTIES_ICON}
            alt="file explorer icon"
            className="h-4 w-4 object-contain"
          />
        </div>
        <div className="flex h-[1.375rem] w-[1.375rem] items-center justify-center">
          <img
            src={FOLDER_ICON}
            alt="file explorer icon"
            className="h-4 w-4 object-contain"
          />
        </div>
      </div>
      <div className="ml-1 h-[0.8125rem] w-[0.1875rem] border border-[rgb(113,113,113)] bg-[rgb(72,72,72)]" /> */}
      <p className="ml-1 text-xs font-normal">{displayData.name}</p>
    </div>
  )
}

export default DisplayFileHeader
