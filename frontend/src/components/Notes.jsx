import React, { useEffect, useRef, useState, useContext } from "react";
import NoteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import Modal from "./Modal";
import { useNavigate } from "react-router";

const Notes = () => {
  const context = useContext(NoteContext);
  const { notes, getNotes } = context;
  const navigate = useNavigate();
  const [selectedNote, setSelectedNote] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  let count = 0;

  useEffect(() => {
    if (localStorage.getItem("UserInfo")) {
      getNotes();
    } else {
      navigate("/login");
    }
  }, []);

  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
    // console.log(note);
  };

  return (
    <>
      <AddNote />
      <div className="pt-4 font-bold text-xl">
        My Notes
        <div className="flex gap-2 font-normal text-lg">
          {notes.length === 0 && "No notes to display"}
          {notes.map((notes) => {
            count++;
            return (
              <NoteItem
                notes={notes}
                key={notes._id}
                onClick={() => {
                  handleNoteClick(notes);
                }}
              />
            );
          })}
        </div>
      </div>
      {selectedNote && (
        <Modal
          note={selectedNote}
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
        />
      )}
      {/* {useEffect(() => {
        getNotes();
      }, [count])} */}
    </>
  );
};

export default Notes;
