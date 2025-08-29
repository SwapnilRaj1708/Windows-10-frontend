import "./styles.css";
import fileExplorerIcon from "@/assets/icons/file-explorer.png";
import React, { useEffect, useId, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import {
  setClose,
  setFocus,
  setOpen,
  setUnfocus,
} from "@/context/redux/globalDataSlice";
import {
  bringFolderToFront,
  closeFolder,
  maximizeFolder,
  openFolder,
  restoreFolder,
  updateFolderPosition,
  updateFolderSize,
} from "@/context/redux/folderSlice";
import { IFolder } from "@/context/redux/folderSlice";

export const MinimizeIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="10"
      height="1"
      viewBox="0 0 10 1"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M0 0H10V1H0V0Z" fill="white" />
    </svg>
  );
};

export const WindowedIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="0.5" y="2.5" width="7" height="7" stroke="white" />
      <path d="M10 8H8V7H9V1H3V2H2V0H10V8Z" fill="white" />
    </svg>
  );
};

export const MaximizedIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect x="0.5" y="0.5" width="9" height="9" stroke="white" />
    </svg>
  );
};

export const CrossIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        x="10"
        width="1"
        height="14.14"
        transform="rotate(45 10 0)"
        fill="white"
      />
      <rect
        y="0.707108"
        width="1"
        height="14.14"
        transform="rotate(-45 0 0.707108)"
        fill="white"
      />
    </svg>
  );
};

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
  );
};

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
  );
};

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
  );
};

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
  );
};

export default function Folder({ folder }: { folder: IFolder }) {
  const dispatch = useDispatch();
  const uniqueId = useId();
  const folderRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Local state for dragging/resizing
  const [resizing, setResizing] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragPointerStartRef = useRef({ x: 0, y: 0 });
  const dragPositionStartRef = useRef({ x: 0, y: 0 });
  const resizePointerStartRef = useRef({ x: 0, y: 0 });
  const resizeSizeStartRef = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const handleDocumentMouseDown = (event: MouseEvent) => {
      if (
        folderRef.current &&
        !folderRef.current.contains(event.target as Node)
      ) {
        dispatch(setUnfocus({ id: folder.id }));
      } else {
        dispatch(setFocus({ id: folder.id }));
      }
    };

    document.addEventListener("click", handleDocumentMouseDown);
    return () => {
      document.removeEventListener("click", handleDocumentMouseDown);
    };
  }, [dispatch, folder.id]);

  // Handle clicking on the folder to bring it to front
  const handleFolderClick = () => {
    dispatch(bringFolderToFront({ id: folder.id }));
  };

  // Handle maximizing/restoring folder
  const handleMaximize = () => {
    if (!folder) return;

    if (folder.isMaximized) {
      dispatch(restoreFolder({ id: folder.id }));
    } else {
      // Get taskbar height
      const taskbarHeight = getComputedStyle(document.documentElement)
        .getPropertyValue("--taskbar-height")
        .trim();
      const taskbarHeightPx = parseFloat(taskbarHeight) * 16; // Convert rem to px

      dispatch(
        maximizeFolder({
          id: folder.id,
          size: {
            width: window.innerWidth,
            height: window.innerHeight - taskbarHeightPx,
          },
          position: { x: 0, y: 0 },
        }),
      );
    }
  };

  // Handle closing folder
  const handleClose = () => {
    dispatch(setClose({ id: folder.id }));
    dispatch(closeFolder({ id: folder.id }));
  };

  const handleChildrenClick = (id: string) => {
    dispatch(setOpen({ id }));
    dispatch(openFolder({ id }));
  };

  // Combined drag and resize functionality
  useEffect(() => {
    if (!folder || !folderRef.current) return;
    const headerNode = headerRef.current;

    // Drag functionality
    const handleDragStart = (e: MouseEvent) => {
      if (!folder) return;

      e.preventDefault();

      // Bring folder to front when starting to drag
      dispatch(bringFolderToFront({ id: folder.id }));

      // If maximized, restore to normal when starting to drag
      if (folder.isMaximized) {
        dispatch(restoreFolder({ id: folder.id }));

        // Need to delay setting up drag to allow state update
        setTimeout(() => {
          setDragging(true);
          dragPointerStartRef.current = { x: e.clientX, y: e.clientY };
          dragPositionStartRef.current = {
            x: folder.prevState?.position.x ?? 0,
            y: folder.prevState?.position.y ?? 0,
          };
        }, 50);
        return;
      }

      setDragging(true);
      dragPointerStartRef.current = { x: e.clientX, y: e.clientY };
      dragPositionStartRef.current = {
        x: folder.position?.x ?? 0,
        y: folder.position?.y ?? 0,
      };
    };

    const handleDrag = (e: MouseEvent) => {
      if (!dragging || !folder || !folderRef.current) return;

      e.preventDefault();

      const dx = e.clientX - dragPointerStartRef.current.x;
      const dy = e.clientY - dragPointerStartRef.current.y;

      const newLeft = dragPositionStartRef.current.x + dx;
      const newTop = dragPositionStartRef.current.y + dy;

      // Update position in Redux directly
      dispatch(
        updateFolderPosition({
          id: folder.id,
          position: { x: newLeft, y: newTop },
        }),
      );

      // We keep start refs constant during a drag; deltas are based on initial down
    };

    const handleDragEnd = () => {
      setDragging(false);
    };

    // Resize functionality
    const handleResizeMove = (e: MouseEvent) => {
      if (!resizing || !folder) return;

      const dx = e.clientX - resizePointerStartRef.current.x;
      const dy = e.clientY - resizePointerStartRef.current.y;

      // Only resize from bottom-right corner
      const newWidth = Math.max(resizeSizeStartRef.current.width + dx, 400); // Minimum width
      const newHeight = Math.max(resizeSizeStartRef.current.height + dy, 400); // Minimum height

      // Update size in Redux directly
      dispatch(
        updateFolderSize({
          id: folder.id,
          size: { width: newWidth, height: newHeight },
        }),
      );
    };

    const handleResizeEnd = () => {
      setResizing(false);
      document.body.style.cursor = "default";
    };

    // Add event listeners
    if (headerNode) {
      headerNode.addEventListener("mousedown", handleDragStart);
    }

    if (dragging) {
      document.addEventListener("mousemove", handleDrag);
      document.addEventListener("mouseup", handleDragEnd);
    }

    if (resizing) {
      document.addEventListener("mousemove", handleResizeMove);
      document.addEventListener("mouseup", handleResizeEnd);
      document.body.style.cursor = "nwse-resize";
    }

    // Cleanup
    return () => {
      if (headerNode) {
        headerNode.removeEventListener("mousedown", handleDragStart);
      }
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("mousemove", handleResizeMove);
      document.removeEventListener("mouseup", handleResizeEnd);
    };
  }, [dragging, resizing, dispatch, folder]);

  const startResize = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!folder) return;

    dispatch(bringFolderToFront({ id: folder.id }));
    setResizing(true);
    resizePointerStartRef.current = { x: e.clientX, y: e.clientY };
    resizeSizeStartRef.current = {
      width: folder.size?.width ?? 0,
      height: folder.size?.height ?? 0,
    };
    document.body.style.cursor = "nwse-resize";
  };

  // If folder is not found in state, don't render
  if (!folder) return null;

  return (
    <article
      ref={folderRef}
      className="flex flex-col border border-[rgb(var(--folder-border-color))] bg-[rgb(var(--folder-background-color))] text-xs font-normal text-white"
      style={{
        position: "absolute",
        width: `${folder.size?.width ?? 640}px`,
        height: `${folder.size?.height ?? 640}px`,
        left: `${folder.position?.x ?? 640}px`,
        top: `${folder.position?.y ?? 640}px`,
        zIndex: folder.zIndex,
      }}
      onClick={handleFolderClick}
    >
      {/* Resize handle - only at bottom right corner */}
      <div
        className="absolute bottom-0 right-0 z-10 h-4 w-4 cursor-nwse-resize"
        onMouseDown={startResize}
      />

      <div className="flex h-[1.875rem] w-full flex-row justify-between">
        <div
          ref={headerRef}
          id={`mydivheader-${uniqueId}`}
          className="flex w-full cursor-move flex-row items-center justify-start"
        >
          <div className="flex h-full flex-row items-center justify-center">
            <div className="flex h-[1.375rem] w-[1.375rem] items-center justify-center">
              <img
                src={folder.icon}
                alt="file explorer icon"
                className="h-4 w-4 object-contain"
              />
            </div>
            <div className="mx-1 h-[0.8125rem] w-[0.1875rem] border border-[rgb(113,113,113)] bg-[rgb(72,72,72)]"></div>
            <div className="flex flex-row items-center justify-center">
              <div className="flex h-[1.375rem] w-[1.375rem] items-center justify-center">
                <img
                  src={fileExplorerIcon}
                  alt="file explorer icon"
                  className="h-4 w-4 object-contain"
                />
              </div>
              <div className="flex h-[1.375rem] w-[1.375rem] items-center justify-center">
                <img
                  src={fileExplorerIcon}
                  alt="file explorer icon"
                  className="h-4 w-4 object-contain"
                />
              </div>
            </div>
            <div className="mx-1 h-[0.8125rem] w-[0.1875rem] border border-[rgb(113,113,113)] bg-[rgb(72,72,72)]"></div>
            <p className="text-xs font-normal">{folder.name}</p>
          </div>
        </div>
        <div className="flex h-full flex-row items-center justify-center pb-[0.0625rem]">
          <div className="flex h-full w-[2.8125rem] items-center justify-center bg-transparent hover:bg-[rgb(26,26,26)] active:bg-[rgb(51,51,51)]">
            <MinimizeIcon />
          </div>
          <div
            className="flex h-full w-[2.8125rem] items-center justify-center bg-transparent hover:bg-[rgb(26,26,26)] active:bg-[rgb(51,51,51)]"
            onClick={handleMaximize}
          >
            {folder.isMaximized ? <WindowedIcon /> : <MaximizedIcon />}
          </div>
          <div
            className="flex h-full w-[2.8125rem] items-center justify-center bg-transparent hover:bg-[rgb(232,17,35)] active:bg-[rgb(139,10,20)]"
            onClick={handleClose}
          >
            <CrossIcon />
          </div>
        </div>
      </div>
      <div className="flex h-[1.4375rem] w-full flex-row items-center justify-start">
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
      <div className="flex h-full flex-1 flex-col bg-[rgb(25,25,25)]">
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
                  src={folder.icon}
                  alt="file explorer icon"
                  className="h-4 w-4 object-contain"
                />
              </div>
              <div className="mr-[0.0625rem] flex h-4 w-4 items-center justify-center">
                <AccordionIcon className="-rotate-90" />
              </div>
              <p className="text-xs font-normal text-white">{folder.name}</p>
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
        <div className="grid flex-1 grid-cols-[195px_1fr] overflow-hidden">
          <div className="flex flex-col">
            <div className="flex flex-1 pt-[1.0625rem]"></div>
            <div className="folder-quick-access-custom-scrollbar mr-0.5 flex h-[calc(100%-1.0625rem)] flex-col gap-0.5 overflow-y-scroll pl-[0.0625rem] pr-0.5">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  // add seleted bg effect here later
                  className="flex h-[1.375rem] w-full items-center justify-start gap-[0.1875rem] pl-5 hover:bg-[rgb(98,98,98)] active:bg-[rgb(119,119,119)]"
                >
                  <div className="flex aspect-square h-full items-center justify-center p-[0.1875rem]">
                    <img
                      src={fileExplorerIcon}
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
          {folder.type === "folder" &&
            folder.children &&
            folder.children.length > 0 && (
              <div className="grid flex-1 grid-cols-[repeat(auto-fill,minmax(105px,1fr))] flex-wrap content-start justify-between gap-0.5 bg-[rgb(32,32,32)] pl-[1.0625rem] pt-1.5">
                {/* add seleted bg effect here later */}
                {folder.children?.map((item, index) => (
                  <div
                    onDoubleClick={() => handleChildrenClick(item.id)}
                    key={index}
                    className="flex h-fit max-h-[161px] w-[105px] flex-col items-center justify-start border border-[rgb(60,60,60)] px-[0.3125rem] pb-0.5 pt-[0.1875rem] hover:bg-[rgb(77,77,77)] active:bg-[rgb(98,98,98)]"
                  >
                    <div className="flex aspect-square w-full flex-col items-center justify-start pb-[0.1875rem] pr-[0.1875rem]">
                      <img
                        src={item.icon}
                        alt="file explorer icon"
                        className="h-full w-full object-contain drop-shadow-[1.5px_1.5px_1.5px_rgba(0,0,0,0.3)]"
                      />
                    </div>
                    <p className="line-clamp-4 overflow-hidden text-ellipsis text-center text-xs font-normal">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          {folder.type === "folder" &&
            (!folder.children || folder.children.length === 0) && (
              <div className="flex flex-1 items-start justify-center gap-0.5 bg-[rgb(32,32,32)] pl-[1.0625rem] pt-1.5">
                {/* add seleted bg effect here later */}
                <span className="mt-2 text-[12px]">This folder is empty.</span>
              </div>
            )}
        </div>
      </div>
    </article>
  );
}
