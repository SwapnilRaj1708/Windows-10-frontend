import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, IRootState } from "@/app/store"
import fileExplorerIcon from "@/assets/icons/file-explorer.png"
import { openItemThunk } from "@/context/redux/globalDataSlice"
import { addItemToPinnedTaskbarSequence } from "@/context/redux/pinnedTaskbarSlice"
import ContextMenuItem from "./ContextMenuItem"

interface Position {
  x: number
  y: number
}

const ContextMenu: React.FC = () => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [contextMenuVisible, setContextMenuVisible] = useState(false)
  const [desktopFolderContextMenuVisible, setDesktopFolderContextMenuVisible] =
    useState(false)
  const [selectedDesktopIconId, setSelectedDesktopIconId] = useState<
    string | null
  >(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch<AppDispatch>()
  const globalData = useSelector((state: IRootState) => state.globalData)

  const getParent = (id: string) => {
    return globalData[id]?.parent
  }

  const contextMenuItems = [
    {
      label: "View",
      children: [
        {
          label: "View",
          onClick: () => console.log("View Clicked"),
          icon: fileExplorerIcon
        }
      ]
    },
    {
      label: "Sort by",
      children: [
        {
          label: "View",
          onClick: () => console.log("View Clicked"),
          icon: fileExplorerIcon
        }
      ]
    },
    {
      label: "Refresh",
      children: [
        {
          label: "View",
          onClick: () => console.log("View Clicked"),
          icon: fileExplorerIcon
        }
      ]
    },
    { divider: true },
    {
      label: "Paste"
      // onClick: () => console.log("Paste clicked"),
    },
    { divider: true },
    {
      label: "New",
      children: [
        {
          label: "View",
          onClick: () => console.log("View Clicked"),
          icon: fileExplorerIcon
        }
      ]
    },
    { divider: true },
    {
      label: "Display settings",
      // onClick: () => console.log("Display settings clicked"),
      icon: fileExplorerIcon
    },
    {
      label: "Personalize",
      // onClick: () => console.log("Personalize clicked"),
      icon: fileExplorerIcon
    }
  ]

  const desktopFolderContextMenuItems = [
    {
      label: <span className="text-[0.75rem] font-semibold">Open</span>,
      onClick: () =>
        selectedDesktopIconId &&
        dispatch(openItemThunk({ id: selectedDesktopIconId })),
      disabled: false
    },
    {
      label: "Open folder location",
      onClick: () =>
        // first identify the parent of the selected desktop icon, then open the parent folder
        {
          const parent = selectedDesktopIconId
            ? getParent(selectedDesktopIconId)
            : null
          if (parent) {
            dispatch(openItemThunk({ id: parent }))
          }
        },
      disabled: false
    },
    { divider: true },
    {
      label: "Pin to taskbar",
      onClick: () =>
        selectedDesktopIconId &&
        dispatch(addItemToPinnedTaskbarSequence({ id: selectedDesktopIconId })),
      disabled: false
    },
    {
      label: "Pin to Start",
      disabled: true
    },
    { divider: true },
    {
      label: "Cut",
      disabled: true
      // onClick: () => console.log("Paste clicked"),
    },
    {
      label: "Copy",
      disabled: true
      // onClick: () => console.log("Paste clicked"),
    },
    {
      label: "Paste",
      disabled: true
      // onClick: () => console.log("Paste clicked"),
    },
    { divider: true },
    {
      label: "Delete",
      disabled: true
      // onClick: () => console.log("Paste clicked"),
    },
    {
      label: "Rename",
      disabled: true
      // onClick: () => console.log("Paste clicked"),
    },
    { divider: true },
    {
      label: "Properties",
      disabled: true
      // onClick: () => console.log("Personalize clicked"),
      // icon: fileExplorerIcon
    }
  ]

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        // This doesn't work
        setContextMenuVisible(false)
        setDesktopFolderContextMenuVisible(false)
      }
    }

    document.addEventListener("click", handleGlobalClick)
    return () => document.removeEventListener("click", handleGlobalClick)
  }, [])

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()

      const target = e.target as HTMLElement
      if (target.closest(".desktop-icon")) {
        console.log("Desktop icon clicked")
        // get the data-id of the desktop icon
        const desktopIconId = target
          .closest(".desktop-icon")
          ?.getAttribute("data-id")
        setSelectedDesktopIconId(desktopIconId ?? null)
        setDesktopFolderContextMenuVisible(true)
        setContextMenuVisible(false)
      } else {
        setContextMenuVisible(true)
        setDesktopFolderContextMenuVisible(false)
      }

      // Show the menu first to calculate its dimensions

      // Use setTimeout to ensure the menu is rendered before measuring
      setTimeout(() => {
        if (menuRef.current) {
          const menuWidth = menuRef.current.offsetWidth
          const menuHeight = menuRef.current.offsetHeight

          const windowWidth = window.innerWidth
          const windowHeight = window.innerHeight

          // Calculate available space
          const spaceRight = windowWidth - e.pageX
          const spaceBottom = windowHeight - e.pageY

          // Determine best position
          let xPos = e.pageX
          let yPos = e.pageY

          // Check horizontal space
          if (spaceRight < menuWidth) {
            xPos = e.pageX - menuWidth // Show to the left of cursor
          }

          // Check vertical space
          if (spaceBottom < menuHeight) {
            yPos = e.pageY - menuHeight // Show above the cursor
          }

          // Ensure menu is never positioned off-screen
          if (xPos < 0) xPos = 0
          if (yPos < 0) yPos = 0

          setPosition({ x: xPos, y: yPos })
        }
      }, 0)
    }

    document.addEventListener("contextmenu", handleContextMenu)
    return () => document.removeEventListener("contextmenu", handleContextMenu)
  }, [])

  if (!contextMenuVisible && !desktopFolderContextMenuVisible) return null

  return (
    <div
      id="context-menu"
      ref={menuRef}
      className="fixed z-50 min-w-[18rem] max-w-[18rem] overflow-x-visible border border-[rgb(var(--context-menu-item-border-color))] bg-[rgb(var(--context-menu-background-color))] px-0.5 py-1 text-white shadow-lg"
      style={{
        top: position.y,
        left: position.x
      }}
    >
      {contextMenuVisible &&
        contextMenuItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.divider ? (
              <hr className="mx-2 my-[0.1875rem] border-[rgb(var(--context-menu-hr-background-color))]" />
            ) : (
              <ContextMenuItem item={item} setVisible={setContextMenuVisible} />
            )}
          </React.Fragment>
        ))}
      {desktopFolderContextMenuVisible &&
        desktopFolderContextMenuItems.map((item, index) => (
          <React.Fragment key={index}>
            {item.divider ? (
              <hr className="mx-2 my-[0.1875rem] border-[rgb(var(--context-menu-hr-background-color))]" />
            ) : (
              <ContextMenuItem
                item={item}
                setVisible={setDesktopFolderContextMenuVisible}
              />
            )}
          </React.Fragment>
        ))}
    </div>
  )
}

export default ContextMenu
