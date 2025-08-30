import React, { useEffect, useRef, useState } from "react"
import ContextMenuItem from "./ContextMenuItem"

interface Position {
  x: number
  y: number
}

interface ContextMenuProps {
  items: {
    label?: string
    onClick?: () => void
    icon?: string
    divider?: boolean
    children?: {
      label?: string
      onClick?: () => void
      icon?: string
    }[]
  }[]
}

const ContextMenu: React.FC<ContextMenuProps> = ({ items }) => {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        // This doesn't work
        setVisible(false)
      }
    }

    document.addEventListener("click", handleGlobalClick)
    return () => document.removeEventListener("click", handleGlobalClick)
  }, [])

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()

      // Show the menu first to calculate its dimensions
      setVisible(true)

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

  if (!visible) return null

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
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {item.divider ? (
            <hr className="mx-2 my-[0.1875rem] border-[rgb(var(--context-menu-hr-background-color))]" />
          ) : (
            <ContextMenuItem item={item} setVisible={setVisible} />
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default ContextMenu
