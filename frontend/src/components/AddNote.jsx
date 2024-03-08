import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";

const AddNote = () => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    // Handle form submission here
    // console.log(note);
    addNote(note.title, note.description, note.tag);
    setNote({
      title: "",
      description: "",
      tag: "",
    });
  };
  return (
    <div className="max-w-md mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={note.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            minLength={5}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={note.description}
            onChange={handleChange}
            placeholder="Enter description"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            minLength={5}
            required
          ></input>
        </div>
        <div className="mb-4">
          <label
            htmlFor="tag"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Tag
          </label>
          <input
            type="text"
            id="tag"
            name="tag"
            value={note.tag}
            onChange={handleChange}
            placeholder="Enter tag"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            type="submit"
            onClick={handleClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={note.title.length < 5 || note.description.length < 5}
          >
            Add note
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNote;
