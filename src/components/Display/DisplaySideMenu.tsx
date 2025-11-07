import { FILE_EXPLORE_ICON } from "@/assets/assets"

const DisplaySideMenu = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-1 pt-[1.0625rem]" />
      <div className="folder-quick-access-custom-scrollbar mr-0.5 flex h-[calc(100%-1.0625rem)] flex-col gap-0.5 overflow-y-scroll pl-[0.0625rem] pr-0.5">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            // add selected bg effect here later
            className="flex h-[1.375rem] w-full items-center justify-start gap-[0.1875rem] pl-5 hover:bg-[rgb(98,98,98)] active:bg-[rgb(119,119,119)]"
          >
            <div className="flex aspect-square h-full items-center justify-center p-[0.1875rem]">
              <img
                src={FILE_EXPLORE_ICON}
                alt="file explorer icon"
                className="aspect-square h-full object-contain"
              />
            </div>
            <p className="line-clamp-1 text-ellipsis text-xs font-normal text-white">
              Quick access
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DisplaySideMenu
