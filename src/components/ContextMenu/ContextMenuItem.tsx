import { ChevronRight } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

const ContextMenuItem = ({
  item,
  setVisible,
}: {
  item: {
    label?: string;
    icon?: string;
    onClick?: () => void;
    children?: {
      label?: string;
      icon?: string;
      onClick?: () => void;
    }[];
  };
  setVisible: Dispatch<SetStateAction<boolean>>;
}) => {
  //   const [isChildrenMenuOpen, setIsChildrenMenuOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={(e) => {
          //   setIsChildrenMenuOpen(true);
          e.stopPropagation();
          if (item.onClick) {
            item.onClick();
            setVisible(false);
          }
        }}
        className="relative flex h-[1.375rem] w-full items-center justify-between gap-2 bg-transparent pl-2 pr-[0.25rem] text-sm hover:bg-[rgb(var(--context-menu-item-hover-background-color))]"
      >
        <div className="flex items-center gap-2">
          <span className="h-4 w-4">
            {item.icon && (
              <img
                src={item.icon}
                alt="icon"
                className="h-4 w-4 object-contain"
              />
            )}
          </span>
          <div className="w-min flex-1 truncate text-xs tracking-tight text-white">
            {item.label}
          </div>
        </div>
        {item.children && (
          <>
            <span className="flex min-h-4 min-w-4 items-center justify-center">
              <ChevronRight size={16} />
            </span>
          </>
        )}
      </button>
      {/* {item.children && isChildrenMenuOpen && (
        <div className="z-51 absolute -right-[13rem] top-0 min-w-[13.625rem] max-w-[13.625rem] border border-[rgb(var(--context-menu-item-border-color))] bg-[rgb(var(--context-menu-background-color))] px-0.5 py-1 text-white shadow-lg">
          {item.children.map(
            (
              child: {
                label?: string;
                icon?: string;
                divider?: boolean;
              },
              index: number,
            ) => (
              <Fragment key={index}>
                {child.divider ? (
                  <hr className="mx-2 my-[0.1875rem] border-[rgb(var(--context-menu-hr-background-color))]" />
                ) : (
                  <ContextMenuItem item={child} setVisible={setVisible} />
                )}
              </Fragment>
            ),
          )}
        </div>
      )} */}
    </div>
  );
};

export default ContextMenuItem;
