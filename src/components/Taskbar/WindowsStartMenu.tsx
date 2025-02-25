import { GiPowerButton } from "react-icons/gi";
import { GoPerson } from "react-icons/go";
import { IoIosMenu } from "react-icons/io";
import { LiaFile } from "react-icons/lia";
import { PiGear, PiImageLight } from "react-icons/pi";
import file_explorer_icon from "../../assets/icons/file_explorer_icon.png";
import { setWindowsStartMenuClose } from "@/context/redux/windowsStartMenuSlice";
import { useDispatch } from "react-redux";
import { useEffect, useRef } from "react";
import { setIsLocked } from "@/context/redux/lockScreenSlice";

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-fit flex-col justify-between px-[0.0625rem]">
      {children}
    </div>
  );
};

const SidebarButton = ({
  children,
  title,
  onClick,
}: {
  children: React.ReactNode;
  title: string;
  onClick?: () => void;
}) => {
  return (
    <div
      title={title}
      className="flex aspect-square w-[2.875rem] items-center justify-center text-white hover:bg-[rgb(var(--gray-color-hover))] active:bg-[rgb(var(--gray-color-active))]"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const AllApps = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex h-full w-[16.9375rem] flex-col gap-[0.3125rem] pl-[0.75rem] pr-[0.0625rem] pt-[0.4375rem]"
      style={{
        scrollbarGutter: "stable",
        scrollbarWidth: "thin",
      }}
    >
      {children}
    </div>
  );
};

const AllAppsItemTitle = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-xs text-white">{children}</p>;
};

const AllAppsItemImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <img className="aspect-square w-6 object-contain" src={src} alt={alt} />
  );
};

const AllAppsItem = ({
  children,
  title,
  noHover,
}: {
  children: React.ReactNode;
  title?: string;
  noHover?: boolean;
}) => {
  return (
    <div
      title={title}
      className={`flex h-[2.15rem] w-full items-center justify-start gap-2 bg-transparent px-[0.65rem] text-xs text-white ${
        noHover
          ? ""
          : "hover:bg-[rgb(var(--gray-color-hover))] active:bg-[rgb(var(--gray-color-active))]"
      }`}
    >
      {children}
    </div>
  );
};

const CategoriesSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex h-full w-[20.5625rem] flex-col gap-[0.6875rem] pl-[0.3125rem] pr-1 pt-5"
      style={{
        scrollbarGutter: "stable",
        scrollbarWidth: "thin",
      }}
    >
      {children}
    </div>
  );
};

const Category = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex w-full flex-col gap-[0.8125rem]">{children}</div>;
};

const CategoryTitle = ({ children }: { children: React.ReactNode }) => {
  return <p className="text-xs font-normal text-white">{children}</p>;
};

const CategoryTilesContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="flex flex-row flex-wrap gap-1">{children}</div>;
};

const CategoryTile = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-[6.25rem] w-[6.25rem] items-center justify-center border-2 border-transparent bg-[rgb(var(--start-menu-category-tiles-background-color))] hover:border-[rgb(var(--start-menu-category-tiles-hover-border-color))] hover:bg-[rgb(var(--start-menu-category-tiles-hover-background-color))] active:bg-[rgb(var(--gray-color-active))]">
      {children}
    </div>
  );
};

const CategoryTileImage = ({ src, alt }: { src: string; alt: string }) => {
  return (
    <img
      className="aspect-square w-full max-w-[2rem] object-contain"
      src={src}
      alt={alt}
    />
  );
};

const WindowsStartMenu = () => {
  const dispatch = useDispatch();

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleCloseWindowsStartMenu = () => {
      dispatch(setWindowsStartMenuClose());
    };
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        !target.closest("#windows-start-button")
      ) {
        handleCloseWindowsStartMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dispatch]);

  const handlePowerButtonClick = () => {
    dispatch(setIsLocked(true));
    dispatch(setWindowsStartMenuClose());
  };

  return (
    <article ref={menuRef} className="flex h-full w-full flex-row">
      <Sidebar>
        <SidebarButton title="START">
          <IoIosMenu size={22} />
        </SidebarButton>
        <div className="flex flex-col gap-0.5">
          <SidebarButton title="Swapnil Raj">
            <div className="flex aspect-square w-5 items-center justify-center rounded-full bg-white">
              <GoPerson size={13} color="black" />
            </div>
          </SidebarButton>
          <SidebarButton title="Documents">
            <LiaFile size={18} />
          </SidebarButton>
          <SidebarButton title="Pictures">
            <PiImageLight size={18} />
          </SidebarButton>
          <SidebarButton title="Settings">
            <PiGear size={18} />
          </SidebarButton>
          <SidebarButton onClick={handlePowerButtonClick} title="Power">
            <GiPowerButton size={16} />
          </SidebarButton>
        </div>
      </Sidebar>
      <AllApps>
        <AllAppsItem noHover={true}>
          <AllAppsItemTitle>C</AllAppsItemTitle>
        </AllAppsItem>
        <AllAppsItem title="Calculator">
          <AllAppsItemImage src={file_explorer_icon} alt="file_explorer_icon" />
          <AllAppsItemTitle>Calculator</AllAppsItemTitle>
        </AllAppsItem>
        <AllAppsItem noHover={true}>
          <AllAppsItemTitle>F</AllAppsItemTitle>
        </AllAppsItem>
        <AllAppsItem title="File Explorer">
          <AllAppsItemImage src={file_explorer_icon} alt="file_explorer_icon" />
          <AllAppsItemTitle>File Explorer</AllAppsItemTitle>
        </AllAppsItem>
        <AllAppsItem title="File Explorer">
          <AllAppsItemImage src={file_explorer_icon} alt="file_explorer_icon" />
          <AllAppsItemTitle>File Explorer</AllAppsItemTitle>
        </AllAppsItem>
      </AllApps>
      <CategoriesSection>
        <Category>
          <CategoryTitle>Productivity</CategoryTitle>
          <CategoryTilesContainer>
            <CategoryTile>
              <CategoryTileImage
                src={file_explorer_icon}
                alt="file_explorer_icon"
              />
            </CategoryTile>
            <CategoryTile>
              <CategoryTileImage
                src={file_explorer_icon}
                alt="file_explorer_icon"
              />
            </CategoryTile>
            <CategoryTile>
              <CategoryTileImage
                src={file_explorer_icon}
                alt="file_explorer_icon"
              />
            </CategoryTile>
            <CategoryTile>
              <CategoryTileImage
                src={file_explorer_icon}
                alt="file_explorer_icon"
              />
            </CategoryTile>
            <CategoryTile>
              <CategoryTileImage
                src={file_explorer_icon}
                alt="file_explorer_icon"
              />
            </CategoryTile>
          </CategoryTilesContainer>
        </Category>
        <Category>
          <CategoryTitle>Explore</CategoryTitle>
          <CategoryTilesContainer>
            <CategoryTile>
              <CategoryTileImage
                src={file_explorer_icon}
                alt="file_explorer_icon"
              />
            </CategoryTile>
            <CategoryTile>
              <CategoryTileImage
                src={file_explorer_icon}
                alt="file_explorer_icon"
              />
            </CategoryTile>
            <CategoryTile>
              <CategoryTileImage
                src={file_explorer_icon}
                alt="file_explorer_icon"
              />
            </CategoryTile>
            <CategoryTile>
              <CategoryTileImage
                src={file_explorer_icon}
                alt="file_explorer_icon"
              />
            </CategoryTile>
            <CategoryTile>
              <CategoryTileImage
                src={file_explorer_icon}
                alt="file_explorer_icon"
              />
            </CategoryTile>
          </CategoryTilesContainer>
        </Category>
      </CategoriesSection>
    </article>
  );
};

export default WindowsStartMenu;
