import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import Note from "./Note";

const NotePage = props => {
  const { notes } = useContext(AppContext);
  const noteArr = notes.filter(note => note.id === props.match.params.notesId);
  const note = noteArr[0];

  return (
    <div>
      <Note {...note} />
      <p>{note.content}</p>
    </div>
  );
};

export default NotePage;
