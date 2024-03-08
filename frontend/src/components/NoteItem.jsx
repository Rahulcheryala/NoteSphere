import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;
  const { notes, onClick } = props;

  return (
    <div className="flex flex-col border-2">
      <div>{notes.title}</div>
      <div>{notes.description}</div>
      <div>{notes.tag}</div>
      <div className="flex gap-4 p-4">
        <i
          className="fa-solid fa-trash"
          onClick={() => {
            deleteNote(notes._id);
          }}
        ></i>
        <i className="fa-solid fa-pen-to-square" onClick={onClick}></i>
      </div>
    </div>
  );
};

export default NoteItem;
