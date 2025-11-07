import { GlobalDataItem } from "@/context/redux/globalDataSlice"

export const ChevronIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect y="5" width="12" height="2" fill="#8C8C8C" />
      <rect
        y="5.2485"
        width="7.42251"
        height="2.16507"
        transform="rotate(-45 0 5.2485)"
        fill="#8C8C8C"
      />
      <rect
        x="1.53125"
        y="5"
        width="7.42251"
        height="2.16507"
        transform="rotate(45 1.53125 5)"
        fill="#8C8C8C"
      />
    </svg>
  )
}

export const AccordionIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="7"
      height="5"
      viewBox="0 0 7 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        y="1.41422"
        width="2"
        height="5"
        transform="rotate(-45 0 1.41422)"
        fill="white"
      />
      <rect
        x="5.53516"
        width="2"
        height="5"
        transform="rotate(45 5.53516 0)"
        fill="white"
      />
    </svg>
  )
}

export const ChevronDownIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="11"
      height="7"
      viewBox="0 0 11 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="4"
        y="4.94971"
        width="7"
        height="2"
        transform="rotate(-45 4 4.94971)"
        fill="white"
      />
      <rect
        x="1.41406"
        width="7"
        height="2"
        transform="rotate(45 1.41406 0)"
        fill="white"
      />
    </svg>
  )
}

export const ReloadIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="10"
      height="11"
      viewBox="0 0 10 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5 1C5.34247 1 5.67689 1.03443 6 1.10002V3.17071C5.68722 3.06015 5.35064 3 5 3C3.34315 3 2 4.34315 2 6C2 7.65685 3.34315 9 5 9C6.65685 9 8 7.65685 8 6C8 5.16714 7.66061 4.41355 7.11259 3.86999L8.42369 2.35603C9.39401 3.26805 10 4.56326 10 6C10 8.76142 7.76142 11 5 11C2.23858 11 0 8.76142 0 6C0 3.23858 2.23858 1 5 1Z"
        fill="white"
      />
      <rect x="1" width="5" height="1" fill="white" />
      <rect x="1" y="1" width="5" height="1" fill="white" />
      <rect
        x="5"
        y="5"
        width="5"
        height="1"
        transform="rotate(-90 5 5)"
        fill="white"
      />
      <rect
        x="4"
        y="5"
        width="5"
        height="1"
        transform="rotate(-90 4 5)"
        fill="white"
      />
    </svg>
  )
}

const DisplayNavigation = ({
  displayData
}: {
  displayData: GlobalDataItem
}) => {
  return (
    <div className="flex h-9 w-full flex-row items-center pl-2 pr-3">
      <div className="flex h-[1.375rem] w-[1.375rem] items-center justify-center">
        <ChevronIcon />
      </div>
      <div className="ml-2 flex h-[1.375rem] w-[1.375rem] items-center justify-center">
        <ChevronIcon className="rotate-180" />
      </div>
      <div className="flex h-[1.375rem] w-[1.375rem] items-center justify-center">
        <AccordionIcon />
      </div>
      <div className="flex h-[1.375rem] w-[1.375rem] items-center justify-center">
        <ChevronIcon className="rotate-90" />
      </div>
      <div className="flex h-[1.375rem] w-[200px] items-center justify-between border border-[rgb(83,83,83)] p-[0.1875rem]">
        <div className="flex flex-row items-center justify-start">
          <div className="mr-[0.0625rem] flex h-4 w-4 items-center justify-center">
            <img
              src={displayData.icon}
              alt="file explorer icon"
              className="h-4 w-4 object-contain"
            />
          </div>
          <div className="mr-[0.0625rem] flex h-4 w-4 items-center justify-center">
            <AccordionIcon className="-rotate-90" />
          </div>
          <p className="text-xs font-normal text-white">{displayData.name}</p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex h-4 w-4 items-center justify-center">
            <ChevronDownIcon />
          </div>
          <div className="flex h-4 w-4 items-center justify-center">
            <ReloadIcon />
          </div>
        </div>
      </div>
      <div className="relative ml-2 flex flex-1">
        <input
          type="text"
          className="flex h-[1.375rem] w-[200px] flex-1 items-center justify-between border border-[rgb(83,83,83)] bg-[rgb(25,25,25)] pl-2 text-xs font-normal text-white"
          placeholder="Search"
        />
        <div className="absolute right-[0.1875rem] top-1/2 flex h-4 w-4 -translate-y-1/2 items-center justify-center">
          <ChevronDownIcon />
        </div>
      </div>
    </div>
  )
}

export default DisplayNavigation
