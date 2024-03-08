import React, { useState, useEffect, useContext } from "react";
import NoteContext from "../context/notes/noteContext";

const Modal = ({ isOpen, setIsOpen, note }) => {
  const context = useContext(NoteContext);
  const { editNote } = context;
  const [editedNote, setEditedNote] = useState(note);
  const handleChange = (e) => {
    setEditedNote({ ...editedNote, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleUpdate = () => {
    // You can implement update logic here
    console.log("Update button clicked");
    setIsOpen(false);
    editNote(
      editedNote._id,
      editedNote.title,
      editedNote.description,
      editedNote.tag
    );
  };

  useEffect(() => {
    setEditedNote(note);
  }, [isOpen]);

  return (
    <div
      className={`${
        isOpen ? "block" : "hidden"
      } fixed inset-0 z-50 overflow-y-auto`}
    >
      <div className="absolute inset-0 bg-black bg-opacity-80">
        <div className="bg-white rounded-lg p-8 max-w-lg mx-auto mt-8 border-2 border-gray-500 z-60">
          <h2 className="text-lg font-bold mb-4">Edit Note</h2>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={editedNote.title}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              minLength={5}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={editedNote.description}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              minLength={5}
              required
            ></input>
          </div>
          <div className="mb-4">
            <label
              htmlFor="tag"
              className="block text-sm font-medium text-gray-700"
            >
              Tag
            </label>
            <input
              type="text"
              id="tag"
              name="tag"
              value={editedNote.tag}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex justify-end">
            <button
              onClick={handleUpdate}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              disabled={
                editedNote.title.length < 5 || editedNote.description.length < 5
              }
            >
              Update
            </button>
            <button
              onClick={handleClose}
              className="ml-2 inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
