import Folder from "./Folder";
import { createPortal } from "react-dom";
import { useSelector } from "react-redux";
import { IRootState } from "@/app/store";

const FolderContainer = () => {
  const openFolders = useSelector(
    (state: IRootState) => state.openFolders.openFolders,
  );
  return (
    <>
      {openFolders.map((folder) =>
        createPortal(<Folder key={folder.id} folder={folder} />, document.body),
      )}
    </>
  );
};

export default FolderContainer;
