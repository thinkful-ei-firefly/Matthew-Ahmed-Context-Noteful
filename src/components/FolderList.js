import React, { useContext } from "react";
import Folder from "./Folder";
import AppContext from "../context/AppContext";

const FolderList = props => {
  const { folders } = useContext(AppContext);
  return (
    <ul className="folder-list">
      {folders.map(folder => (
        <Folder name={folder.name} id={folder.id} key={folder.id} />
      ))}
    </ul>
  );
};

export default FolderList;
