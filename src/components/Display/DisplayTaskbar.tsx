const DisplayTaskbar = () => {
  return (
    <div className="flex min-h-[1.4375rem] w-full flex-row items-center justify-start">
      <div className="flex h-full min-w-14 items-center justify-center bg-[rgb(0,102,180)] px-1 text-xs font-normal text-white hover:bg-[rgb(0,125,221)] active:bg-[rgb(0,85,150)]">
        File
      </div>
      <div className="flex h-full min-w-14 items-center justify-center bg-transparent px-1 text-xs font-normal text-white hover:bg-[rgb(77,77,77)] active:bg-[rgb(32,32,32)]">
        Home
      </div>
      <div className="flex h-full min-w-14 items-center justify-center bg-transparent px-1 text-xs font-normal text-white hover:bg-[rgb(77,77,77)] active:bg-[rgb(32,32,32)]">
        Share
      </div>
      <div className="flex h-full min-w-14 items-center justify-center bg-transparent px-1 text-xs font-normal text-white hover:bg-[rgb(77,77,77)] active:bg-[rgb(32,32,32)]">
        View
      </div>
    </div>
  )
}

export default DisplayTaskbar
